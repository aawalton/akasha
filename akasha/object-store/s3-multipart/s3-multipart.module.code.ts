import { requireMatchPositional } from "@akasha/utils-narrow/require-match-positional"
import { z } from "zod"
import { encodeObjectStoreKey } from "../key/object-store-key.module.code.ts"
import { signS3Request } from "../s3-signing/s3-signing.module.code.ts"
import type { SeaweedFSConfig } from "../seaweedfs-config/seaweedfs-config.module.code.ts"

const MULTIPART_REQUEST_TIMEOUT_MS = 120_000

export const MULTIPART_THRESHOLD_BYTES = 16 * 1024 * 1024

export const MULTIPART_PART_SIZE_BYTES = 8 * 1024 * 1024

const UPLOAD_ID_RE = /<UploadId>([^<]+)<\/UploadId>/
const UPLOAD_ID_CAPTURES = z.tuple([z.string()])

export async function s3PutObjectMultipart(
  config: SeaweedFSConfig,
  key: string,
  body: Uint8Array<ArrayBuffer>,
  opts?: { partSize?: number }
): Promise<void> {
  const { s3Endpoint, bucket, accessKey, secretKey, region } = config
  const partSize = opts?.partSize ?? MULTIPART_PART_SIZE_BYTES
  const resolvedRegion = region ?? "us-east-1"
  const objectUrl = `${s3Endpoint}/${bucket}/${encodeObjectStoreKey(key)}`
  const sign = (method: string, url: string, reqBody: Uint8Array | string) =>
    signS3Request({ method, url, body: reqBody, accessKey, secretKey, region: resolvedRegion })

  const createUrl = `${objectUrl}?uploads`
  const createRes = await fetch(createUrl, {
    method: "POST",
    headers: sign("POST", createUrl, ""),
    signal: AbortSignal.timeout(MULTIPART_REQUEST_TIMEOUT_MS),
  })
  if (!createRes.ok) {
    const text = await createRes.text().catch(() => "")
    throw new Error(
      `SeaweedFS S3 CreateMultipartUpload failed (${createRes.status} ${createRes.statusText}): ${text.slice(0, 500)}`
    )
  }
  const [uploadId] = requireMatchPositional(
    UPLOAD_ID_RE,
    UPLOAD_ID_CAPTURES,
    await createRes.text(),
    "SeaweedFS S3 CreateMultipartUpload response"
  )
  const encodedUploadId = encodeURIComponent(uploadId)

  try {
    const parts: { partNumber: number; etag: string }[] = []
    const partCount = Math.ceil(body.length / partSize)
    for (let i = 0; i < partCount; i++) {
      const partNumber = i + 1
      const slice = body.subarray(i * partSize, Math.min((i + 1) * partSize, body.length))
      const partUrl = `${objectUrl}?partNumber=${partNumber}&uploadId=${encodedUploadId}`
      const res = await fetch(partUrl, {
        method: "PUT",
        headers: { ...sign("PUT", partUrl, slice), "Content-Type": "application/octet-stream" },
        body: slice,
        signal: AbortSignal.timeout(MULTIPART_REQUEST_TIMEOUT_MS),
      })
      const etag = res.headers.get("etag")
      if (!res.ok || etag === null || etag === "") {
        const text = await res.text().catch(() => "")
        throw new Error(
          `SeaweedFS S3 UploadPart ${partNumber} failed (${res.status} ${res.statusText}): ${text.slice(0, 500)}`
        )
      }
      parts.push({ partNumber, etag })
    }

    const completeXml = `<CompleteMultipartUpload>${parts
      .map((p) => `<Part><PartNumber>${p.partNumber}</PartNumber><ETag>${p.etag}</ETag></Part>`)
      .join("")}</CompleteMultipartUpload>`
    const completeUrl = `${objectUrl}?uploadId=${encodedUploadId}`
    const completeRes = await fetch(completeUrl, {
      method: "POST",
      headers: { ...sign("POST", completeUrl, completeXml), "Content-Type": "application/xml" },
      body: completeXml,
      signal: AbortSignal.timeout(MULTIPART_REQUEST_TIMEOUT_MS),
    })
    const completeText = await completeRes.text().catch(() => "")
    if (!completeRes.ok || completeText.includes("<Error")) {
      throw new Error(
        `SeaweedFS S3 CompleteMultipartUpload failed (${completeRes.status} ${completeRes.statusText}): ${completeText.slice(0, 500)}`
      )
    }
  } catch (err) {
    const abortUrl = `${objectUrl}?uploadId=${encodedUploadId}`
    await fetch(abortUrl, {
      method: "DELETE",
      headers: sign("DELETE", abortUrl, ""),
      signal: AbortSignal.timeout(MULTIPART_REQUEST_TIMEOUT_MS),
    }).catch(() => {})
    throw err
  }
}
