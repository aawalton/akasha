import { afterEach, describe, expect, it } from "bun:test"
import { resolveShellHlsSrc } from "./shell-media-src"

const realFetch = globalThis.fetch
let fetchCalls: string[] = []
function stubTokenFetch() {
  fetchCalls = []
  const stub: typeof fetch = Object.assign(
    (input: Parameters<typeof fetch>[0]) => {
      fetchCalls.push(String(input))
      return Promise.resolve(new Response(JSON.stringify({ token: "TESTTOKEN" }), { status: 200 }))
    },
    { preconnect: realFetch.preconnect }
  )
  globalThis.fetch = stub
}

afterEach(() => {
  globalThis.fetch = realFetch
})

describe("resolveShellHlsSrc — WebKit from-N playlist URL (#15790)", () => {
  it("appends &fromSentence=N to the token'd playlist for a from-N pick (N > 0)", async () => {
    stubTokenFetch()
    const url = await resolveShellHlsSrc({
      pageId: "page-1",
      medium: "audio",
      variant: "kokoro",
      fromSentence: 5,
    })
    expect(url).toBe(
      "/api/media/page-1/audio/hls.m3u8?variant=kokoro&token=TESTTOKEN&fromSentence=5"
    )
  })

  it("omits fromSentence for the whole chapter (N = 0 / null / absent — byte-identical)", async () => {
    stubTokenFetch()
    const whole = "/api/media/page-1/audio/hls.m3u8?variant=kokoro&token=TESTTOKEN"
    expect(
      await resolveShellHlsSrc({
        pageId: "page-1",
        medium: "audio",
        variant: "kokoro",
        fromSentence: 0,
      })
    ).toBe(whole)
    expect(
      await resolveShellHlsSrc({
        pageId: "page-1",
        medium: "audio",
        variant: "kokoro",
        fromSentence: null,
      })
    ).toBe(whole)
    expect(await resolveShellHlsSrc({ pageId: "page-1", medium: "audio", variant: "kokoro" })).toBe(
      whole
    )
  })

  it("does NOT carry fromSentence into the token mint (one token authorizes any offset)", async () => {
    stubTokenFetch()
    await resolveShellHlsSrc({
      pageId: "page-1",
      medium: "audio",
      variant: "kokoro",
      fromSentence: 5,
    })
    expect(fetchCalls[0]).toContain("/api/media/token?")
    expect(fetchCalls[0]).not.toContain("fromSentence")
  })
})
