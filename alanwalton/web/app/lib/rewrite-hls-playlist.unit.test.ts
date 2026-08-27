import { describe, expect, it } from "bun:test"
import { rewriteHlsPlaylist } from "./rewrite-hls-playlist"

const PAGE = "019ea3a3-a93b-7646-9058-1d4c02ac2e4d"
const BASE = {
  origin: "https://alanwalton.com",
  pageId: PAGE,
  medium: "audio",
  variant: "kokoro",
}

const GROWING = [
  "#EXTM3U",
  "#EXT-X-VERSION:3",
  "#EXT-X-TARGETDURATION:10",
  "#EXT-X-MEDIA-SEQUENCE:0",
  "#EXTINF:8.500,",
  "seg00000.mp3",
  "#EXTINF:7.250,",
  "seg00001.mp3",
  "",
].join("\n")

describe("rewriteHlsPlaylist", () => {
  it("token path: each segment URI carries variant + the presented token", () => {
    const out = rewriteHlsPlaylist(GROWING, { ...BASE, token: "1700000000000.sig" })
    expect(out).toContain(
      `https://alanwalton.com/api/media/${PAGE}/audio/hls/seg00000.mp3?variant=kokoro&token=1700000000000.sig`
    )
    expect(out).toContain(
      `https://alanwalton.com/api/media/${PAGE}/audio/hls/seg00001.mp3?variant=kokoro&token=1700000000000.sig`
    )
  })

  it("cookie path (no token): segment URLs are token-less same-origin", () => {
    const out = rewriteHlsPlaylist(GROWING, { ...BASE, token: null })
    expect(out).toContain(
      `https://alanwalton.com/api/media/${PAGE}/audio/hls/seg00000.mp3?variant=kokoro`
    )
    expect(out).not.toContain("token=")
  })

  it("preserves every tag/comment line and blank line verbatim", () => {
    const out = rewriteHlsPlaylist(GROWING, { ...BASE, token: null }).split("\n")
    expect(out[0]).toBe("#EXTM3U")
    expect(out[1]).toBe("#EXT-X-VERSION:3")
    expect(out[4]).toBe("#EXTINF:8.500,")
    expect(out.filter((l) => l.startsWith("#")).length).toBe(6)
  })

  it("preserves an appended ENDLIST on a completed playlist", () => {
    const done = `${GROWING}#EXT-X-ENDLIST\n`
    const out = rewriteHlsPlaylist(done, { ...BASE, token: null })
    expect(out).toContain("#EXT-X-ENDLIST")
  })

  it("rewrites nothing when there are no segment lines yet", () => {
    const header = "#EXTM3U\n#EXT-X-VERSION:3\n"
    expect(rewriteHlsPlaylist(header, { ...BASE, token: null })).toBe(header)
  })

  describe("generate-from-N (#15773)", () => {
    it("threads &fromSentence=N onto every segment URL for a from-N render", () => {
      const out = rewriteHlsPlaylist(GROWING, { ...BASE, token: null, fromSentence: 7 })
      expect(out).toContain(
        `https://alanwalton.com/api/media/${PAGE}/audio/hls/seg00000.mp3?variant=kokoro&fromSentence=7`
      )
      expect(out).toContain(
        `https://alanwalton.com/api/media/${PAGE}/audio/hls/seg00001.mp3?variant=kokoro&fromSentence=7`
      )
    })

    it("carries both token and fromSentence on the shell token path", () => {
      const out = rewriteHlsPlaylist(GROWING, {
        ...BASE,
        token: "1700000000000.sig",
        fromSentence: 3,
      })
      expect(out).toContain(
        `https://alanwalton.com/api/media/${PAGE}/audio/hls/seg00000.mp3?variant=kokoro&token=1700000000000.sig&fromSentence=3`
      )
    })

    it("omits fromSentence for a whole-chapter render (0 / absent / negative)", () => {
      expect(rewriteHlsPlaylist(GROWING, { ...BASE, token: null, fromSentence: 0 })).not.toContain(
        "fromSentence"
      )
      expect(rewriteHlsPlaylist(GROWING, { ...BASE, token: null })).not.toContain("fromSentence")
      expect(rewriteHlsPlaylist(GROWING, { ...BASE, token: null, fromSentence: -1 })).not.toContain(
        "fromSentence"
      )
    })
  })
})
