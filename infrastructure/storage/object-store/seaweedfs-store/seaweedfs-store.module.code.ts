import { encodeObjectStoreKey } from "../key/object-store-key.module.code.ts"
import {
  MULTIPART_THRESHOLD_BYTES,
  s3PutObjectMultipart,
} from "../s3-multipart/s3-multipart.module.code.ts"
import { signS3Request } from "../s3-signing/s3-signing.module.code.ts"
import {
  type SeaweedFSConfig,
  seaweedFsConfigFromEnv,
} from "../seaweedfs-config/seaweedfs-config.module.code.ts"

const OBJECT_STORE_TIMEOUT_MS = 120_000

export interface ObjectStore {
  append: (key: string, bytes: Uint8Array<ArrayBuffer>) => Promise<void>
  put: (key: string, bytes: Uint8Array<ArrayBuffer>) => Promise<void>
  head: (key: string) => Promise<{ size: number; etag?: string } | null>
  get: (key: string, compressed?: boolean) => Promise<Uint8Array>
  getStream: (key: string, opts?: { range?: string | null }) => Promise<ObjectStreamResult | null>
}

export type ObjectStreamResult = {
  status: number
  body: ReadableStream<Uint8Array<ArrayBuffer>> | null
  contentLength: number | null
  contentRange: string | null
  etag: string | null
}

export function makeSeaweedFSObjectStore(config: SeaweedFSConfig): ObjectStore {
  const s3Accumulator = new Map<string, Uint8Array>()

  async function s3Request(
    method: "GET" | "HEAD",
    key: string,
    opts?: { extraHeaders?: Record<string, string>; signal?: AbortSignal | null }
  ): Promise<Response> {
    const { s3Endpoint, bucket, accessKey, secretKey, region } = config
    const url = `${s3Endpoint}/${bucket}/${encodeObjectStoreKey(key)}`
    const signed = signS3Request({
      method,
      url,
      body: "",
      accessKey,
      secretKey,
      region: region ?? "us-east-1",
    })
    const headers = opts?.extraHeaders ? { ...signed, ...opts.extraHeaders } : signed
    const signal =
      opts?.signal === undefined ? AbortSignal.timeout(OBJECT_STORE_TIMEOUT_MS) : opts.signal
    return fetch(url, { method, headers, ...(signal ? { signal } : {}) })
  }

  async function s3PutObject(key: string, body: Uint8Array<ArrayBuffer>): Promise<void> {
    if (body.length > MULTIPART_THRESHOLD_BYTES) {
      await s3PutObjectMultipart(config, key, body)
    } else {
      const { s3Endpoint, bucket, accessKey, secretKey, region } = config
      const url = `${s3Endpoint}/${bucket}/${encodeObjectStoreKey(key)}`
      const headers = signS3Request({
        method: "PUT",
        url,
        body,
        accessKey,
        secretKey,
        region: region ?? "us-east-1",
      })
      const res = await fetch(url, {
        method: "PUT",
        headers: { ...headers, "Content-Type": "application/octet-stream" },
        body,
        signal: AbortSignal.timeout(OBJECT_STORE_TIMEOUT_MS),
      })
      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(
          `SeaweedFS S3 PUT failed (${res.status} ${res.statusText}): ${text.slice(0, 500)}`
        )
      }
    }
    s3Accumulator.set(key, body)
  }

  async function head(key: string): Promise<{ size: number; etag?: string } | null> {
    const res = await s3Request("HEAD", key)
    if (res.status === 404) return null
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(
        `SeaweedFS S3 HEAD failed (${res.status} ${res.statusText}): ${text.slice(0, 500)}`
      )
    }
    const len = res.headers.get("content-length")
    const size = len != null ? Number.parseInt(len, 10) : 0
    const etag = res.headers.get("etag")
    return { size: Number.isFinite(size) ? size : 0, etag: etag ?? undefined }
  }

  async function get(key: string, compressed?: boolean): Promise<Uint8Array> {
    const res = await s3Request("GET", key)
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(
        `SeaweedFS S3 GET failed (${res.status} ${res.statusText}): ${text.slice(0, 500)}`
      )
    }
    const body = new Uint8Array(await res.arrayBuffer())
    if (compressed) {
      if (typeof Bun === "undefined" || typeof Bun.zstdDecompressSync !== "function") {
        throw new Error("zstd decompression requires Bun.zstdDecompressSync")
      }
      return Bun.zstdDecompressSync(body)
    }
    return body
  }

  async function getStream(
    key: string,
    opts?: { range?: string | null }
  ): Promise<ObjectStreamResult | null> {
    const extraHeaders = opts?.range != null ? { Range: opts.range } : undefined
    const res = await s3Request("GET", key, { extraHeaders, signal: null })
    if (res.status === 404) {
      await res.body?.cancel().catch(() => {})
      return null
    }
    if (res.status !== 200 && res.status !== 206 && res.status !== 416) {
      const text = await res.text().catch(() => "")
      throw new Error(
        `SeaweedFS S3 GET (stream) failed (${res.status} ${res.statusText}): ${text.slice(0, 500)}`
      )
    }
    const lenHeader = res.headers.get("content-length")
    const len = lenHeader != null ? Number.parseInt(lenHeader, 10) : Number.NaN
    return {
      status: res.status,
      body: res.body,
      contentLength: Number.isFinite(len) ? len : null,
      contentRange: res.headers.get("content-range"),
      etag: res.headers.get("etag"),
    }
  }

  async function append(key: string, bytes: Uint8Array<ArrayBuffer>): Promise<void> {
    if (bytes.length === 0) return
    const { filerUrl, bucket } = config

    if (filerUrl != null) {
      const url = `${filerUrl}/buckets/${bucket}/${encodeObjectStoreKey(key)}?op=append`
      const form = new FormData()
      form.append("file", new Blob([bytes], { type: "application/octet-stream" }))
      const res = await fetch(url, {
        method: "POST",
        body: form,
        signal: AbortSignal.timeout(OBJECT_STORE_TIMEOUT_MS),
      })
      if (!res.ok) {
        const text = await res.text().catch(() => "")
        throw new Error(
          `SeaweedFS filer append failed (${res.status} ${res.statusText}): ${text.slice(0, 500)}`
        )
      }
      return
    }

    let existing = s3Accumulator.get(key)
    if (!existing) {
      const headResult = await head(key)
      if (headResult && headResult.size > 0) {
        existing = await get(key)
      } else {
        existing = new Uint8Array(0)
      }
    }
    const merged = new Uint8Array(existing.length + bytes.length)
    merged.set(existing, 0)
    merged.set(bytes, existing.length)
    s3Accumulator.set(key, merged)
    await s3PutObject(key, merged)
  }

  return { append, put: s3PutObject, head, get, getStream }
}

export function seaweedFSObjectStoreFromEnv(): ObjectStore | null {
  const config = seaweedFsConfigFromEnv()
  if (!config) return null
  return makeSeaweedFSObjectStore(config)
}
