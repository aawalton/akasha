import { describe, expect, it } from "bun:test"
import { parseHlsExtinf } from "./hls-extinf"

describe("parseHlsExtinf", () => {
  it("reads per-segment durations and the ENDLIST flag from a completed playlist", () => {
    const m3u8 = [
      "#EXTM3U",
      "#EXT-X-VERSION:3",
      "#EXT-X-TARGETDURATION:10",
      "#EXT-X-MEDIA-SEQUENCE:0",
      "#EXTINF:8.512,",
      "seg00000.mp3",
      "#EXTINF:6.240,",
      "seg00001.mp3",
      "#EXTINF:3.100,",
      "seg00002.mp3",
      "#EXT-X-ENDLIST",
      "",
    ].join("\n")
    expect(parseHlsExtinf(m3u8)).toEqual({ durations: [8.512, 6.24, 3.1], ended: true })
  })

  it("reports a growing playlist as not ended", () => {
    const m3u8 = ["#EXTM3U", "#EXTINF:4.0,", "seg00000.mp3", "#EXTINF:5.0,", "seg00001.mp3"].join(
      "\n"
    )
    expect(parseHlsExtinf(m3u8)).toEqual({ durations: [4, 5], ended: false })
  })

  it("tolerates a title after the comma and surrounding whitespace", () => {
    const m3u8 = ["#EXTINF:2.5,segment title", "  seg00000.mp3  ", "#EXT-X-ENDLIST"].join("\n")
    expect(parseHlsExtinf(m3u8)).toEqual({ durations: [2.5], ended: true })
  })

  it("skips a malformed EXTINF duration (fails safe to a shorter list)", () => {
    const m3u8 = ["#EXTINF:oops,", "seg0.mp3", "#EXTINF:3.0,", "seg1.mp3", "#EXT-X-ENDLIST"].join(
      "\n"
    )
    expect(parseHlsExtinf(m3u8)).toEqual({ durations: [3], ended: true })
  })

  it("returns an empty timing for a playlist with no EXTINF lines", () => {
    expect(parseHlsExtinf("#EXTM3U\n#EXT-X-VERSION:3\n")).toEqual({ durations: [], ended: false })
  })
})
