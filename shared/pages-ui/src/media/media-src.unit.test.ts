import { describe, expect, it } from "bun:test"
import {
  KOKORO_STREAM_VARIANT,
  mediaHlsSrcForVariant,
  mediaSrcForVariant,
  STORED_READ_ALOUD_VARIANT,
} from "./media-src"

describe("mediaSrcForVariant", () => {
  it("routes a real narrator variant to the stored-object byte route", () => {
    expect(mediaSrcForVariant("page-1", "audio", "amy")).toBe("/api/media/page-1/audio?variant=amy")
  })

  it("routes the reserved streaming variant to the on-demand proxy route", () => {
    expect(mediaSrcForVariant("page-1", "audio", KOKORO_STREAM_VARIANT)).toBe(
      "/api/media/page-1/audio/stream"
    )
  })

  it("does not leak the reserved id into the stored byte route as a query", () => {
    const src = mediaSrcForVariant("p", "audio", KOKORO_STREAM_VARIANT)
    expect(src).not.toContain("?variant=")
  })

  it("routes the stored read-aloud rendition to the seekable byte route, not the live stream", () => {
    const src = mediaSrcForVariant("page-1", "audio", STORED_READ_ALOUD_VARIANT)
    expect(src).toBe("/api/media/page-1/audio?variant=read-aloud")
    expect(src).not.toContain("/stream")
  })

  it("appends ?fromSentence=N to the kokoro /stream for a from-N pick (N > 0)", () => {
    expect(mediaSrcForVariant("page-1", "audio", KOKORO_STREAM_VARIANT, 5)).toBe(
      "/api/media/page-1/audio/stream?fromSentence=5"
    )
  })

  it("keeps the whole-chapter kokoro /stream byte-identical for N = 0 / null / absent", () => {
    const whole = "/api/media/page-1/audio/stream"
    expect(mediaSrcForVariant("page-1", "audio", KOKORO_STREAM_VARIANT, 0)).toBe(whole)
    expect(mediaSrcForVariant("page-1", "audio", KOKORO_STREAM_VARIANT, null)).toBe(whole)
    expect(mediaSrcForVariant("page-1", "audio", KOKORO_STREAM_VARIANT, undefined)).toBe(whole)
    expect(mediaSrcForVariant("page-1", "audio", KOKORO_STREAM_VARIANT)).toBe(whole)
  })

  it("never appends fromSentence to a stored narrator byte route (from-N is kokoro-only)", () => {
    expect(mediaSrcForVariant("page-1", "audio", "amy", 5)).toBe(
      "/api/media/page-1/audio?variant=amy"
    )
  })
})

describe("mediaHlsSrcForVariant — WebKit from-N (#15790)", () => {
  it("appends &fromSentence=N to the kokoro HLS playlist for a from-N pick (N > 0)", () => {
    expect(mediaHlsSrcForVariant("page-1", "audio", 5)).toBe(
      "/api/media/page-1/audio/hls.m3u8?variant=kokoro&fromSentence=5"
    )
  })

  it("keeps the whole-chapter HLS playlist byte-identical for N = 0 / null / absent", () => {
    const whole = "/api/media/page-1/audio/hls.m3u8?variant=kokoro"
    expect(mediaHlsSrcForVariant("page-1", "audio", 0)).toBe(whole)
    expect(mediaHlsSrcForVariant("page-1", "audio", null)).toBe(whole)
    expect(mediaHlsSrcForVariant("page-1", "audio")).toBe(whole)
  })
})
