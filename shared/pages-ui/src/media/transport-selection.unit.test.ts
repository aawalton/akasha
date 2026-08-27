import { describe, expect, it } from "bun:test"
import { KOKORO_STREAM_VARIANT } from "./media-src"
import { selectTransport } from "./transport-selection"

describe("selectTransport", () => {
  describe("web platform, non-WebKit (hasResolver=false, isWebKit=false — e.g. Chromium)", () => {
    it("yields web-src for the Kokoro variant (today's /stream fast path, unchanged)", () => {
      expect(
        selectTransport({
          hasResolver: false,
          hasNativeTts: false,
          isWebKit: false,
          variant: KOKORO_STREAM_VARIANT,
        })
      ).toBe("web-src")
    })

    it("yields web-src for a normal narrator variant", () => {
      expect(
        selectTransport({
          hasResolver: false,
          hasNativeTts: false,
          isWebKit: false,
          variant: "some-narrator",
        })
      ).toBe("web-src")
    })

    it("ALWAYS yields web-src regardless of variant or hasNativeTts (web non-WebKit is byte-identical, never native)", () => {
      for (const variant of [KOKORO_STREAM_VARIANT, "some-narrator", "amy", ""]) {
        for (const hasNativeTts of [true, false]) {
          expect(
            selectTransport({ hasResolver: false, hasNativeTts, isWebKit: false, variant })
          ).toBe("web-src")
        }
      }
    })
  })

  describe("web platform, WebKit (hasResolver=false, isWebKit=true — iOS Safari / desktop Safari)", () => {
    it("yields hls-src for the Kokoro variant (folds in the former suppressWebKitStream divert)", () => {
      expect(
        selectTransport({
          hasResolver: false,
          hasNativeTts: false,
          isWebKit: true,
          variant: KOKORO_STREAM_VARIANT,
        })
      ).toBe("hls-src")
    })

    it("yields web-src for a narrator variant (only Kokoro routes to HLS)", () => {
      expect(
        selectTransport({
          hasResolver: false,
          hasNativeTts: false,
          isWebKit: true,
          variant: "some-narrator",
        })
      ).toBe("web-src")
    })
  })

  describe("capacitor shell, WebKit (hasResolver=true, isWebKit=true — the real iOS WKWebView)", () => {
    it("yields native-plugin for Kokoro when native TTS is present (native wins over HLS)", () => {
      expect(
        selectTransport({
          hasResolver: true,
          hasNativeTts: true,
          isWebKit: true,
          variant: KOKORO_STREAM_VARIANT,
        })
      ).toBe("native-plugin")
    })

    it("yields hls-src for Kokoro when native TTS is absent (the WebKit streaming path)", () => {
      expect(
        selectTransport({
          hasResolver: true,
          hasNativeTts: false,
          isWebKit: true,
          variant: KOKORO_STREAM_VARIANT,
        })
      ).toBe("hls-src")
    })

    it("yields shell-src for a narrator variant even with native TTS present (MOSS stored variant never goes native or HLS)", () => {
      expect(
        selectTransport({
          hasResolver: true,
          hasNativeTts: true,
          isWebKit: true,
          variant: "some-narrator",
        })
      ).toBe("shell-src")
    })

    it("yields shell-src for a narrator variant when native TTS is absent", () => {
      expect(
        selectTransport({
          hasResolver: true,
          hasNativeTts: false,
          isWebKit: true,
          variant: "some-narrator",
        })
      ).toBe("shell-src")
    })
  })

  describe("capacitor shell, non-WebKit (hasResolver=true, isWebKit=false — a hypothetical Blink shell)", () => {
    it("yields native-plugin for Kokoro when native TTS is present", () => {
      expect(
        selectTransport({
          hasResolver: true,
          hasNativeTts: true,
          isWebKit: false,
          variant: KOKORO_STREAM_VARIANT,
        })
      ).toBe("native-plugin")
    })

    it("yields shell-src for Kokoro when native TTS is absent (no HLS off WebKit; the #15701 /stream fallback)", () => {
      expect(
        selectTransport({
          hasResolver: true,
          hasNativeTts: false,
          isWebKit: false,
          variant: KOKORO_STREAM_VARIANT,
        })
      ).toBe("shell-src")
    })
  })
})
