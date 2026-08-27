import { describe, expect, test } from "bun:test"
import { forwardedOrigin } from "./forwarded-origin"

describe("forwardedOrigin", () => {
  const url = new URL("http://alanwalton.com/api/media/p/audio/hls.m3u8?variant=kokoro")

  test("honors X-Forwarded-Proto: https over the plaintext pod scheme", () => {
    expect(forwardedOrigin(url, "https")).toBe("https://alanwalton.com")
  })

  test("takes the FIRST hop of a comma-separated proxy chain", () => {
    expect(forwardedOrigin(url, "https, http")).toBe("https://alanwalton.com")
  })

  test("falls back to the URL scheme when the header is absent", () => {
    expect(forwardedOrigin(url, null)).toBe("http://alanwalton.com")
  })

  test("falls back to the URL scheme on an unrecognized header value", () => {
    expect(forwardedOrigin(url, "ftp")).toBe("http://alanwalton.com")
  })

  test("preserves host + port and honors an https direct hit", () => {
    const local = new URL("https://localhost:3000/api/media/p/audio/hls.m3u8?variant=kokoro")
    expect(forwardedOrigin(local, null)).toBe("https://localhost:3000")
  })
})
