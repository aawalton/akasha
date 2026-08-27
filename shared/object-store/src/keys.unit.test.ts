import { describe, expect, it } from "bun:test"
import {
  hlsPlaylistObjectKey,
  hlsSegmentObjectKey,
  hlsSegmentPrefix,
  imageObjectKey,
  legacyImageObjectKey,
  mediaRenderObjectKey,
  voiceCentroidObjectKey,
  voiceReferenceObjectKey,
} from "./keys"

const PAGE = "019ea3a3-a93b-7646-9058-1d4c02ac2e4d"

describe("object-keys", () => {
  it("image keys carry the canonical + legacy prefixes", () => {
    expect(imageObjectKey(PAGE)).toBe(`images/${PAGE}.png`)
    expect(legacyImageObjectKey(PAGE)).toBe(`persona-images/${PAGE}.png`)
  })

  it("mediaRenderObjectKey composes pageId / medium / variant / ext", () => {
    expect(mediaRenderObjectKey(PAGE, "audio", "read-aloud", "mp3")).toBe(
      `media-renders/${PAGE}/audio/read-aloud.mp3`
    )
  })

  it("voice keys carry the persona-voices prefix", () => {
    expect(voiceReferenceObjectKey(PAGE)).toBe(`persona-voices/${PAGE}.reference.wav`)
    expect(voiceCentroidObjectKey(PAGE)).toBe(`persona-voices/${PAGE}.centroid.json`)
  })

  describe("HLS keys", () => {
    it("hlsPlaylistObjectKey is the audio read-aloud-hls .m3u8 (non-.mp3 stem)", () => {
      expect(hlsPlaylistObjectKey(PAGE)).toBe(`media-renders/${PAGE}/audio/read-aloud-hls.m3u8`)
      expect(hlsPlaylistObjectKey(PAGE).endsWith(".mp3")).toBe(false)
    })

    it("hlsSegmentPrefix is the trailing-slash segment directory", () => {
      expect(hlsSegmentPrefix(PAGE)).toBe(`media-renders/${PAGE}/audio/read-aloud-hls/`)
      expect(hlsSegmentPrefix(PAGE).endsWith("/")).toBe(true)
    })

    it("hlsSegmentObjectKey appends the bare segment filename to the prefix", () => {
      expect(hlsSegmentObjectKey(PAGE, "seg00000.mp3")).toBe(
        `media-renders/${PAGE}/audio/read-aloud-hls/seg00000.mp3`
      )
      expect(hlsSegmentObjectKey(PAGE, "seg00042.mp3")).toBe(
        `${hlsSegmentPrefix(PAGE)}seg00042.mp3`
      )
    })

    describe("generate-from-N (#15773) suffixed keys", () => {
      it("fromSentence > 0 routes playlist + segments to a disjoint read-aloud-hls.from-<N> namespace", () => {
        expect(hlsPlaylistObjectKey(PAGE, { fromSentence: 7 })).toBe(
          `media-renders/${PAGE}/audio/read-aloud-hls.from-7.m3u8`
        )
        expect(hlsSegmentPrefix(PAGE, { fromSentence: 7 })).toBe(
          `media-renders/${PAGE}/audio/read-aloud-hls.from-7/`
        )
        expect(hlsSegmentObjectKey(PAGE, "seg00000.mp3", { fromSentence: 7 })).toBe(
          `media-renders/${PAGE}/audio/read-aloud-hls.from-7/seg00000.mp3`
        )
      })

      it("the from-N namespace is disjoint from the canonical whole-chapter keys (no collision / no marks-source overwrite)", () => {
        expect(hlsPlaylistObjectKey(PAGE, { fromSentence: 3 })).not.toBe(hlsPlaylistObjectKey(PAGE))
        expect(hlsSegmentPrefix(PAGE, { fromSentence: 3 })).not.toBe(hlsSegmentPrefix(PAGE))
      })

      it("fromSentence 0 / absent / negative is exactly the canonical whole-chapter key", () => {
        expect(hlsPlaylistObjectKey(PAGE, { fromSentence: 0 })).toBe(hlsPlaylistObjectKey(PAGE))
        expect(hlsPlaylistObjectKey(PAGE, { fromSentence: -2 })).toBe(hlsPlaylistObjectKey(PAGE))
        expect(hlsSegmentPrefix(PAGE, { fromSentence: 0 })).toBe(hlsSegmentPrefix(PAGE))
      })

      it("the from-N stem stays non-.mp3 (still excluded from #15688's narrator-duration average)", () => {
        expect(hlsPlaylistObjectKey(PAGE, { fromSentence: 9 }).endsWith(".mp3")).toBe(false)
      })

      it("a fractional fromSentence truncates in the key", () => {
        expect(hlsPlaylistObjectKey(PAGE, { fromSentence: 4.8 })).toBe(
          `media-renders/${PAGE}/audio/read-aloud-hls.from-4.m3u8`
        )
      })
    })
  })
})
