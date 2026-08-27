import { describe, expect, test } from "bun:test"
import { pickBestSource, type SourceImage } from "./crop-upscale-eso-wallpapers"

describe("pickBestSource", () => {
  test("among equal-aspect (16:9) sources, picks the highest resolution", () => {
    const images: SourceImage[] = [
      { path: "a/1920x1080.jpg", width: 1920, height: 1080 },
      { path: "a/3840x2160.jpg", width: 3840, height: 2160 },
      { path: "a/2560x1440.jpg", width: 2560, height: 1440 },
    ]
    expect(pickBestSource(images)?.path).toBe("a/3840x2160.jpg")
  })

  test("prefers closest-aspect 16:9 over a wider-but-near-square tablet render", () => {
    const images: SourceImage[] = [
      { path: "a/2880x2560.jpg", width: 2880, height: 2560 },
      { path: "a/1920x1200.jpg", width: 1920, height: 1200 },
      { path: "a/1920x1080.jpg", width: 1920, height: 1080 },
    ]
    expect(pickBestSource(images)?.path).toBe("a/1920x1080.jpg")
  })

  test("prefers 16:9 over 16:10 at equal width (closer to ultrawide)", () => {
    const images: SourceImage[] = [
      { path: "a/1920x1200.jpg", width: 1920, height: 1200 },
      { path: "a/1920x1080.jpg", width: 1920, height: 1080 },
    ]
    expect(pickBestSource(images)?.path).toBe("a/1920x1080.jpg")
  })

  test("falls back to the least-portrait source when none are landscape", () => {
    const images: SourceImage[] = [
      { path: "a/750x1334.jpg", width: 750, height: 1334 },
      { path: "a/1242x2208.jpg", width: 1242, height: 2208 },
    ]
    expect(pickBestSource(images)?.path).toBe("a/1242x2208.jpg")
  })

  test("returns undefined for an empty set", () => {
    expect(pickBestSource([])).toBeUndefined()
  })
})
