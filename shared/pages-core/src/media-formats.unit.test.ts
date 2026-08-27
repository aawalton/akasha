import { describe, expect, it } from "bun:test"
import { isMedium, MEDIA_FORMATS } from "./media-formats"

describe("MEDIA_FORMATS", () => {
  it("maps audio to the mp3 ext + audio/mpeg content type", () => {
    expect(MEDIA_FORMATS.audio).toEqual({ ext: "mp3", contentType: "audio/mpeg" })
  })
})

describe("isMedium", () => {
  it("accepts a declared medium", () => {
    expect(isMedium("audio")).toBe(true)
  })

  it("rejects an undeclared medium (the serve-route 404 boundary)", () => {
    expect(isMedium("video")).toBe(false)
    expect(isMedium("")).toBe(false)
    expect(isMedium("AUDIO")).toBe(false)
  })

  it("narrows so the format lookup is total", () => {
    const raw = "audio"
    if (isMedium(raw)) {
      expect(MEDIA_FORMATS[raw].ext).toBe("mp3")
    }
  })
})
