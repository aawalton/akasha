import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { requireFirst } from "../../../utils-narrow/src/require-first"
import { createFetchStub } from "../fetch-stub"
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

describe("makeSeaweedFSObjectStore.head", () => {
  it("returns size from Content-Length on 200", async () => {
    nextResponse = () => new Response("", { status: 200, headers: { "content-length": "42" } })
    const store = makeSeaweedFSObjectStore(CFG)
    const r = await store.head("sessions/a1.jsonl")
    expect(r).toEqual({ size: 42 })
    const call0 = requireFirst(calls)
    expect(call0.url).toBe("http://s3.local:8333/agent-sessions/sessions/a1.jsonl")
    expect(call0.init.method).toBe("HEAD")
    expect(call0.init.headers.Authorization).toMatch(/^AWS4-HMAC-SHA256/)
  })

  it("surfaces the S3 ETag header alongside size", async () => {
    nextResponse = () =>
      new Response("", {
        status: 200,
        headers: { "content-length": "42", etag: '"abc123"' },
      })
    const store = makeSeaweedFSObjectStore(CFG)
    const r = await store.head("persona-images/x.png")
    expect(r).toEqual({ size: 42, etag: '"abc123"' })
  })

  it("returns null on 404", async () => {
    nextResponse = () => new Response("", { status: 404 })
    const store = makeSeaweedFSObjectStore(CFG)
    const r = await store.head("sessions/missing.jsonl")
    expect(r).toBeNull()
  })

  it("throws on other errors", async () => {
    nextResponse = () => new Response("boom", { status: 500 })
    const store = makeSeaweedFSObjectStore(CFG)
    await expect(store.head("sessions/a1.jsonl")).rejects.toThrow(/HEAD failed/)
  })
})

describe("makeSeaweedFSObjectStore.get", () => {
  it("returns raw bytes when compressed is false", async () => {
    const payload = new TextEncoder().encode("line1\nline2\n")
    nextResponse = () => new Response(payload, { status: 200 })
    const store = makeSeaweedFSObjectStore(CFG)
    const bytes = await store.get("sessions/a1.jsonl")
    expect(Buffer.from(bytes).toString()).toBe("line1\nline2\n")
    expect(requireFirst(calls).init.method).toBe("GET")
  })

  it("zstd-decompresses when compressed is true", async () => {
    const original = new TextEncoder().encode("line1\nline2\n")
    const compressed = new Uint8Array(Bun.zstdCompressSync(original))
    nextResponse = () => new Response(compressed, { status: 200 })
    const store = makeSeaweedFSObjectStore(CFG)
    const bytes = await store.get("sessions/a1.jsonl", true)
    expect(Buffer.from(bytes).toString()).toBe("line1\nline2\n")
  })
})

describe("makeSeaweedFSObjectStore.getStream", () => {
  const KEY = "media-renders/abc/audio/zadi.mp3"

  it("forwards the client Range header and maps a 206 partial response", async () => {
    const store = makeSeaweedFSObjectStore(CFG)
    nextResponse = () =>
      new Response(new Uint8Array([1, 2]), {
        status: 206,
        headers: {
          "content-length": "2",
          "content-range": "bytes 0-1/36634149",
          "accept-ranges": "bytes",
        },
      })
    const result = await store.getStream(KEY, { range: "bytes=0-1" })
    expect(result).not.toBeNull()
    expect(result?.status).toBe(206)
    expect(result?.contentLength).toBe(2)
    expect(result?.contentRange).toBe("bytes 0-1/36634149")
    const call = requireFirst(calls)
    expect(call.init.headers.Range ?? call.init.headers.range).toBe("bytes=0-1")
    expect(call.init.method).toBe("GET")
  })

  it("returns a 200 with full length and a live body when no range is given", async () => {
    const store = makeSeaweedFSObjectStore(CFG)
    const payload = new Uint8Array([9, 9, 9, 9])
    nextResponse = () => new Response(payload, { status: 200, headers: { "content-length": "4" } })
    const result = await store.getStream(KEY)
    expect(result?.status).toBe(200)
    expect(result?.contentLength).toBe(4)
    expect(result?.contentRange).toBeNull()
    expect(result?.body).toBeInstanceOf(ReadableStream)
    const buffered = new Uint8Array(await new Response(result?.body).arrayBuffer())
    expect([...buffered]).toEqual([9, 9, 9, 9])
    const call = requireFirst(calls)
    expect(call.init.headers.Range ?? call.init.headers.range).toBeUndefined()
  })

  it("returns null when the object does not exist (404)", async () => {
    const store = makeSeaweedFSObjectStore(CFG)
    nextResponse = () => new Response("not found", { status: 404 })
    expect(await store.getStream(KEY)).toBeNull()
  })

  it("throws on an unexpected gateway status", async () => {
    const store = makeSeaweedFSObjectStore(CFG)
    nextResponse = () => new Response("boom", { status: 500 })
    await expect(store.getStream(KEY)).rejects.toThrow(/GET \(stream\) failed \(500/)
  })
})
