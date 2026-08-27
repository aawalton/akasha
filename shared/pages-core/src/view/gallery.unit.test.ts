import { describe, expect, it } from "bun:test"
import {
  DEFAULT_GALLERY_CARD_SIZE,
  GALLERY_CARD_SIZES,
  galleryCardMinWidth,
  resolveGalleryCardSize,
  resolveGalleryCoverUrl,
} from "./gallery"

describe("galleryCardMinWidth", () => {
  it("increases monotonically with size", () => {
    expect(galleryCardMinWidth("small")).toBeLessThan(galleryCardMinWidth("medium"))
    expect(galleryCardMinWidth("medium")).toBeLessThan(galleryCardMinWidth("large"))
  })
})

describe("resolveGalleryCardSize", () => {
  it("passes through valid sizes", () => {
    for (const size of GALLERY_CARD_SIZES) {
      expect(resolveGalleryCardSize(size)).toBe(size)
    }
  })

  it("falls back to the default for unknown / missing values", () => {
    expect(resolveGalleryCardSize(undefined)).toBe(DEFAULT_GALLERY_CARD_SIZE)
    expect(resolveGalleryCardSize(null)).toBe(DEFAULT_GALLERY_CARD_SIZE)
    expect(resolveGalleryCardSize("huge")).toBe(DEFAULT_GALLERY_CARD_SIZE)
    expect(resolveGalleryCardSize(3)).toBe(DEFAULT_GALLERY_CARD_SIZE)
  })
})

describe("resolveGalleryCoverUrl", () => {
  it("returns a trimmed non-empty string", () => {
    expect(resolveGalleryCoverUrl("https://example.com/a.png")).toBe("https://example.com/a.png")
    expect(resolveGalleryCoverUrl("  https://example.com/b.png  ")).toBe(
      "https://example.com/b.png"
    )
  })

  it("returns null for empty / whitespace / non-string values", () => {
    expect(resolveGalleryCoverUrl("")).toBeNull()
    expect(resolveGalleryCoverUrl("   ")).toBeNull()
    expect(resolveGalleryCoverUrl(undefined)).toBeNull()
    expect(resolveGalleryCoverUrl(null)).toBeNull()
    expect(resolveGalleryCoverUrl(42)).toBeNull()
    expect(resolveGalleryCoverUrl(["x"])).toBeNull()
  })
})
