import { beforeEach, describe, expect, it, mock } from "bun:test"
import type { ObjectStreamResult } from "@shared/object-store"
import type { GetPageArgs } from "@shared/pages-access/get"
import { Page } from "@shared/pages-core/page-types"
import * as realAuthServer from "@shared/supabase-rr/auth/server"
import type { PageLookup, ServeMediaParams } from "./serve-media"

let resolveCalls = 0

mock.module("@shared/supabase-rr/auth/server", () => ({
  getUser: async () => ({ user: null, headers: new Headers() }),
  getUserFromBearerToken: async () => ({ user: null }),
  parseBearerToken: realAuthServer.parseBearerToken,
  resolveRequestUser: async () => {
    resolveCalls += 1
    return { user: null, headers: new Headers() }
  },
}))

const { serveMedia, buildMediaStreamResponse, capMediaRange, mediaRangeStart, mediaPageStands } =
  await import("./serve-media")

function trackedStream(bytes: readonly number[]): {
  stream: ReadableStream<Uint8Array<ArrayBuffer>>
  wasPulled: () => boolean
} {
  let pulled = false
  const stream = new ReadableStream<Uint8Array<ArrayBuffer>>({
    pull(controller) {
      pulled = true
      controller.enqueue(new Uint8Array(bytes))
      controller.close()
    },
  })
  return { stream, wasPulled: () => pulled }
}

const PARAMS: ServeMediaParams = {
  pageId: "019ea3a3-a93b-7646-9058-1d4c02ac2e4c",
  medium: "audio",
  variant: "default",
}

beforeEach(() => {
  resolveCalls = 0
})

describe("serveMedia auth gate", () => {
  it("resolves identity via resolveRequestUser and 401s when it returns no user", async () => {
    const res = await serveMedia(new Request("https://x/api/media/x/audio"), PARAMS)
    expect(res.status).toBe(401)
    expect(resolveCalls).toBe(1)
  })

  it("routes a Bearer request through the same resolver (no separate branch here)", async () => {
    const res = await serveMedia(
      new Request("https://x/api/media/x/audio", {
        headers: { Authorization: "Bearer the-jwt" },
      }),
      PARAMS
    )
    expect(res.status).toBe(401)
    expect(resolveCalls).toBe(1)
  })
})

describe("serveMedia capability-token branch (#15686)", () => {
  const withToken = (token: string): Request =>
    new Request(`https://x/api/media/${PARAMS.pageId}/audio?variant=default&token=${token}`)

  it("rejects an invalid token WITHOUT falling back to the session resolver", async () => {
    const res = await serveMedia(withToken("deadbeef.notavalidsignature"), PARAMS)
    expect(res.status).toBe(401)
    expect(resolveCalls).toBe(0)
  })

  it("falls back to the session resolver only when no token is present", async () => {
    const res = await serveMedia(
      new Request(`https://x/api/media/${PARAMS.pageId}/audio?variant=default`),
      PARAMS
    )
    expect(res.status).toBe(401)
    expect(resolveCalls).toBe(1)
  })
})

describe("mediaPageStands — a file-backed medium is reached through its page type", () => {
  const ID = "019f158b-672c-723a-ab88-fca2fed5a211"

  function recorder(answers: readonly boolean[]): {
    look: PageLookup
    asked: readonly GetPageArgs[]
  } {
    const asked: GetPageArgs[] = []
    return {
      asked,
      look: async (args) => {
        asked.push(args)
        return answers[asked.length - 1] === true ? Page({ id: ID }) : null
      },
    }
  }

  it("asks the medium's own page type first, naming it", async () => {
    const { look, asked } = recorder([true])
    expect(await mediaPageStands(ID, "image", look)).toBe(true)
    expect(asked[0]?.pageTypeSlug).toBe("image")
  })

  it("names audio for an audio request rather than a constant", async () => {
    const { look, asked } = recorder([true])
    await mediaPageStands(ID, "audio", look)
    expect(asked[0]?.pageTypeSlug).toBe("audio")
  })

  it("stops at the typed ask when it finds the page, spending one query", async () => {
    const { look, asked } = recorder([true])
    await mediaPageStands(ID, "image", look)
    expect(asked.length).toBe(1)
  })

  it("falls back to an untyped ask, keeping a page of another type reachable", async () => {
    const { look, asked } = recorder([false, true])
    expect(await mediaPageStands(ID, "audio", look)).toBe(true)
    expect(asked.length).toBe(2)
    expect(asked[1]?.pageTypeSlug).toBeUndefined()
  })

  it("fails closed when neither ask finds the page", async () => {
    const { look, asked } = recorder([false, false])
    expect(await mediaPageStands(ID, "image", look)).toBe(false)
    expect(asked.length).toBe(2)
  })
})

describe("buildMediaStreamResponse — streaming passthrough (#13764)", () => {
  it("mirrors a 206 partial response with Content-Range + Content-Length", () => {
    const { stream } = trackedStream([1, 2])
    const result: ObjectStreamResult = {
      status: 206,
      body: stream,
      contentLength: 2,
      contentRange: "bytes 0-1/36634149",
      etag: '"abc123"',
    }
    const res = buildMediaStreamResponse(result, "audio/mpeg", new Headers())
    expect(res.status).toBe(206)
    expect(res.headers.get("Content-Type")).toBe("audio/mpeg")
    expect(res.headers.get("Content-Range")).toBe("bytes 0-1/36634149")
    expect(res.headers.get("Content-Length")).toBe("2")
    expect(res.headers.get("Accept-Ranges")).toBe("bytes")
    expect(res.headers.get("Cache-Control")).toBe("private, no-cache")
    expect(res.headers.get("ETag")).toBe('"abc123"')
  })

  it("passes the live body stream through without buffering it", () => {
    const { stream, wasPulled } = trackedStream(new Array(35_000_000).fill(7))
    const result: ObjectStreamResult = {
      status: 200,
      body: stream,
      contentLength: 35_000_000,
      contentRange: null,
      etag: null,
    }
    const res = buildMediaStreamResponse(result, "audio/mpeg", new Headers())
    expect(res.status).toBe(200)
    expect(res.headers.get("Content-Length")).toBe("35000000")
    expect(res.headers.get("Content-Range")).toBeNull()
    expect(wasPulled()).toBe(false)
    expect(res.body).toBe(stream)
  })

  it("omits Content-Length when the gateway did not report one", () => {
    const { stream } = trackedStream([0])
    const result: ObjectStreamResult = {
      status: 200,
      body: stream,
      contentLength: null,
      contentRange: null,
      etag: null,
    }
    const res = buildMediaStreamResponse(result, "audio/mpeg", new Headers())
    expect(res.headers.get("Content-Length")).toBeNull()
  })

  it("omits ETag when the gateway did not report one", () => {
    const { stream } = trackedStream([0])
    const result: ObjectStreamResult = {
      status: 200,
      body: stream,
      contentLength: null,
      contentRange: null,
      etag: null,
    }
    const res = buildMediaStreamResponse(result, "audio/mpeg", new Headers())
    expect(res.headers.get("ETag")).toBeNull()
  })
})

describe("capMediaRange — per-response byte ceiling (#15753)", () => {
  const CAP = 8 * 1024 * 1024

  it("caps an open-ended range to a bounded chunk", () => {
    expect(capMediaRange("bytes=0-", CAP)).toBe(`bytes=0-${CAP - 1}`)
  })

  it("caps a resume range starting at a non-zero offset", () => {
    expect(capMediaRange(`bytes=${CAP}-`, CAP)).toBe(`bytes=${CAP}-${2 * CAP - 1}`)
  })

  it("clamps an explicit end that exceeds the cap", () => {
    expect(capMediaRange("bytes=0-99999999", CAP)).toBe(`bytes=0-${CAP - 1}`)
  })

  it("leaves an explicit end already within the cap untouched", () => {
    expect(capMediaRange("bytes=0-1000", CAP)).toBe("bytes=0-1000")
  })

  it("passes Safari's opening bytes=0-1 probe through unchanged (exact 2 bytes)", () => {
    expect(capMediaRange("bytes=0-1", CAP)).toBe("bytes=0-1")
  })

  it("forwards non-canonical suffix / multi-range forms verbatim (cap N/A)", () => {
    expect(capMediaRange("bytes=-500", CAP)).toBe("bytes=-500")
    expect(capMediaRange("bytes=0-1,100-200", CAP)).toBe("bytes=0-1,100-200")
  })
})

describe("mediaRangeStart — resume-offset parse for If-Range restart", () => {
  it("is 0 for an absent header", () => {
    expect(mediaRangeStart(null)).toBe(0)
  })

  it("is 0 for a from-head range", () => {
    expect(mediaRangeStart("bytes=0-")).toBe(0)
  })

  it("reads the start offset of a resume range", () => {
    expect(mediaRangeStart("bytes=8388608-")).toBe(8388608)
  })

  it("is 0 for a non-canonical range (no interleave risk to guard)", () => {
    expect(mediaRangeStart("bytes=-500")).toBe(0)
  })
})
