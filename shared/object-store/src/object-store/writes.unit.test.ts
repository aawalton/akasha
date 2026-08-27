import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import { createFetchStub } from "../fetch-stub"
import { MULTIPART_PART_SIZE_BYTES, MULTIPART_THRESHOLD_BYTES } from "../multipart"
import { makeSeaweedFSObjectStore } from "../object-store"
import { CFG, type FetchCall, recordInit } from "./test-helpers"

let calls: FetchCall[]
let originalFetch: typeof fetch
let nextResponse: () => Response

beforeEach(() => {
  calls = []
  originalFetch = globalThis.fetch
  nextResponse = () => new Response("", { status: 200 })
  globalThis.fetch = createFetchStub(async (input, init) => {
    const url = typeof input === "string" ? input : input.toString()
    calls.push({ url, init: recordInit(init) })
    return nextResponse()
  })
})

afterEach(() => {
  globalThis.fetch = originalFetch
})

describe("makeSeaweedFSObjectStore.append", () => {
  it("is a no-op for empty bytes", async () => {
    const store = makeSeaweedFSObjectStore(CFG)
    await store.append("sessions/a1.jsonl", new Uint8Array(0))
    expect(calls).toHaveLength(0)
  })

  it("throws on filer error", async () => {
    nextResponse = () => new Response("boom", { status: 500 })
    const store = makeSeaweedFSObjectStore(CFG)
    await expect(store.append("sessions/a1.jsonl", new Uint8Array([1, 2, 3]))).rejects.toThrow(
      /filer append failed/
    )
  })
})

describe("makeSeaweedFSObjectStore.append (S3-PUT fallback)", () => {
  const CFG_NO_FILER = { ...CFG, filerUrl: undefined }

  it("S3 PUTs the whole object when filerUrl is unset (empty remote)", async () => {
    let call = 0
    nextResponse = () => {
      call++
      if (call === 1) return new Response("", { status: 404 })
      return new Response("", { status: 200 })
    }
    const store = makeSeaweedFSObjectStore(CFG_NO_FILER)
    const bytes = new TextEncoder().encode("hello\n")
    await store.append("sessions/a1.jsonl", bytes)
    expect(calls).toHaveLength(2)
    const call0 = requireFirst(calls)
    const call1 = requireFirst(calls.slice(1))
    expect(call0.init.method).toBe("HEAD")
    expect(call1.init.method).toBe("PUT")
    const putBody = call1.init.body
    expect(putBody).toBeDefined()
    if (putBody) expect(Buffer.from(putBody).toString()).toBe("hello\n")
  })

  it("subsequent appends concatenate and re-PUT without re-hydrating", async () => {
    let call = 0
    nextResponse = () => {
      call++
      if (call === 1) return new Response("", { status: 404 })
      return new Response("", { status: 200 })
    }
    const store = makeSeaweedFSObjectStore(CFG_NO_FILER)
    await store.append("sessions/a1.jsonl", new TextEncoder().encode("one\n"))
    await store.append("sessions/a1.jsonl", new TextEncoder().encode("two\n"))
    expect(calls).toHaveLength(3)
    const call0 = requireFirst(calls)
    const call1 = requireFirst(calls.slice(1))
    const call2 = requireFirst(calls.slice(2))
    expect(call0.init.method).toBe("HEAD")
    expect(call1.init.method).toBe("PUT")
    expect(call2.init.method).toBe("PUT")
    const secondPutBody = call2.init.body
    expect(secondPutBody).toBeDefined()
    if (secondPutBody) expect(Buffer.from(secondPutBody).toString()).toBe("one\ntwo\n")
  })
})

describe("makeSeaweedFSObjectStore.put", () => {
  it("S3 PUTs the whole object body once, overwrite-in-place (no HEAD/GET)", async () => {
    nextResponse = () => new Response("", { status: 200 })
    const store = makeSeaweedFSObjectStore(CFG)
    const bytes = new TextEncoder().encode("PNGDATA")
    await store.put("persona-images/019ee78b.png", bytes)
    expect(calls).toHaveLength(1)
    const call0 = requireFirst(calls)
    expect(call0.url).toBe("http://s3.local:8333/agent-sessions/persona-images/019ee78b.png")
    expect(call0.init.method).toBe("PUT")
    expect(call0.init.headers.Authorization).toMatch(/^AWS4-HMAC-SHA256/)
    const putBody = call0.init.body
    expect(putBody).toBeDefined()
    if (putBody) expect(Buffer.from(putBody).toString()).toBe("PNGDATA")
  })

  it("throws on S3 PUT error", async () => {
    nextResponse = () => new Response("boom", { status: 500 })
    const store = makeSeaweedFSObjectStore(CFG)
    await expect(store.put("persona-images/x.png", new Uint8Array([1, 2, 3]))).rejects.toThrow(
      /PUT failed/
    )
  })

  it("reseeds the S3-PUT accumulator so a later append merges onto the put body (#13118)", async () => {
    const CFG_NO_FILER = { ...CFG, filerUrl: undefined }
    nextResponse = () => new Response("", { status: 200 })
    const store = makeSeaweedFSObjectStore(CFG_NO_FILER)

    await store.put("sessions/a1.jsonl", new TextEncoder().encode("PUT-BODY\n"))
    await store.append("sessions/a1.jsonl", new TextEncoder().encode("delta\n"))

    const putCalls = calls.filter((c) => c.init.method === "PUT")
    const lastPut = putCalls[putCalls.length - 1]
    expect(lastPut).toBeDefined()
    if (lastPut?.init.body) {
      expect(Buffer.from(lastPut.init.body).toString()).toBe("PUT-BODY\ndelta\n")
    }
    expect(calls.some((c) => c.init.method === "HEAD")).toBe(false)
    expect(calls.some((c) => c.init.method === "GET")).toBe(false)
  })
})

describe("makeSeaweedFSObjectStore.put (multipart, large objects)", () => {
  const UPLOAD_ID = "test-upload-id-123"

  function multipartResponder(opts?: { failPart?: number }): () => Response {
    return () => {
      const current = calls[calls.length - 1]
      if (!current) return new Response("", { status: 200 })
      const u = new URL(current.url)
      const method = current.init.method
      const partNumber = u.searchParams.get("partNumber")
      const uploadId = u.searchParams.get("uploadId")
      if (method === "POST" && u.searchParams.has("uploads")) {
        return new Response(
          `<?xml version="1.0"?><InitiateMultipartUploadResult><UploadId>${UPLOAD_ID}</UploadId></InitiateMultipartUploadResult>`,
          { status: 200 }
        )
      }
      if (method === "PUT" && partNumber != null) {
        if (opts?.failPart != null && Number(partNumber) === opts.failPart) {
          return new Response("boom", { status: 500 })
        }
        return new Response("", { status: 200, headers: { etag: `"etag-${partNumber}"` } })
      }
      if (method === "POST" && uploadId != null) {
        return new Response(
          `<?xml version="1.0"?><CompleteMultipartUploadResult><ETag>"final"</ETag></CompleteMultipartUploadResult>`,
          { status: 200 }
        )
      }
      if (method === "DELETE" && uploadId != null) return new Response("", { status: 204 })
      return new Response("", { status: 200 })
    }
  }

  it("routes a >threshold PUT through the multipart API (create → parts → complete)", async () => {
    nextResponse = multipartResponder()
    const store = makeSeaweedFSObjectStore(CFG)
    await store.put("audio/big.wav", new Uint8Array(MULTIPART_THRESHOLD_BYTES + 1))
    const first = requireFirst(calls)
    expect(first.init.method).toBe("POST")
    expect(first.url).toContain("?uploads")
    const last = calls[calls.length - 1]
    expect(last?.init.method).toBe("POST")
    expect(last?.url).toContain(`uploadId=${UPLOAD_ID}`)
    const partCalls = calls.filter((c) => new URL(c.url).searchParams.get("partNumber") != null)
    expect(partCalls.length).toBeGreaterThanOrEqual(1)
    expect(partCalls.every((c) => c.init.method === "PUT")).toBe(true)
    expect(partCalls.every((c) => c.url.includes(`uploadId=${UPLOAD_ID}`))).toBe(true)
  })

  it("splits into ceil(size/part_size) parts, none exceeding part_size (O(part_size) gateway bound)", async () => {
    nextResponse = multipartResponder()
    const store = makeSeaweedFSObjectStore(CFG)
    const size = MULTIPART_PART_SIZE_BYTES * 2 + 1234
    await store.put("audio/big.wav", new Uint8Array(size))
    const partCalls = calls.filter((c) => new URL(c.url).searchParams.get("partNumber") != null)
    expect(partCalls.length).toBe(Math.ceil(size / MULTIPART_PART_SIZE_BYTES))
    for (const c of partCalls) {
      expect(c.init.body?.length ?? 0).toBeLessThanOrEqual(MULTIPART_PART_SIZE_BYTES)
    }
    for (const c of calls) {
      expect(c.init.body?.length ?? 0).toBeLessThan(size)
    }
    const numbers = partCalls.map((c) => Number(new URL(c.url).searchParams.get("partNumber")))
    expect(numbers).toEqual([1, 2, 3])
  })

  it("sends a Complete request whose XML lists every part number + returned ETag", async () => {
    nextResponse = multipartResponder()
    const store = makeSeaweedFSObjectStore(CFG)
    await store.put("audio/big.wav", new Uint8Array(MULTIPART_PART_SIZE_BYTES * 2 + 10))
    const complete = calls[calls.length - 1]
    const completeUrl = complete ? new URL(complete.url) : null
    expect(complete?.init.method).toBe("POST")
    expect(completeUrl?.searchParams.has("uploadId")).toBe(true)
    expect(completeUrl?.searchParams.has("uploads")).toBe(false)
    const body = complete?.init.body ? Buffer.from(complete.init.body).toString() : ""
    expect(body).toContain("<PartNumber>1</PartNumber>")
    expect(body).toContain("<PartNumber>3</PartNumber>")
    expect(body).toContain('<ETag>"etag-1"</ETag>')
    expect(body).toContain('<ETag>"etag-3"</ETag>')
  })

  it("stays single-part at exactly the threshold (one whole-object PUT, no ?uploads)", async () => {
    nextResponse = multipartResponder()
    const store = makeSeaweedFSObjectStore(CFG)
    await store.put("audio/at.wav", new Uint8Array(MULTIPART_THRESHOLD_BYTES))
    expect(calls).toHaveLength(1)
    const only = requireFirst(calls)
    expect(only.init.method).toBe("PUT")
    expect(only.url).not.toContain("uploads")
  })

  it("switches to multipart one byte over the threshold", async () => {
    nextResponse = multipartResponder()
    const store = makeSeaweedFSObjectStore(CFG)
    await store.put("audio/over.wav", new Uint8Array(MULTIPART_THRESHOLD_BYTES + 1))
    expect(calls.some((c) => c.url.includes("?uploads"))).toBe(true)
  })

  it("aborts the upload and rejects when a part fails, leaving no orphaned parts", async () => {
    nextResponse = multipartResponder({ failPart: 2 })
    const store = makeSeaweedFSObjectStore(CFG)
    const size = MULTIPART_PART_SIZE_BYTES * 2 + 5
    await expect(store.put("audio/fail.wav", new Uint8Array(size))).rejects.toThrow()
    const abortCalls = calls.filter(
      (c) => c.init.method === "DELETE" && c.url.includes(`uploadId=${UPLOAD_ID}`)
    )
    expect(abortCalls.length).toBe(1)
    const part3 = calls.filter((c) => new URL(c.url).searchParams.get("partNumber") === "3")
    expect(part3.length).toBe(0)
    const completeCalls = calls.filter(
      (c) =>
        c.init.method === "POST" &&
        new URL(c.url).searchParams.has("uploadId") &&
        !new URL(c.url).searchParams.has("uploads")
    )
    expect(completeCalls.length).toBe(0)
  })
})
