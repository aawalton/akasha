import { describe, expect, test } from "bun:test"
import {
  classifyWallpaperSource,
  findConfidentWallpaperSource,
  pathBasename,
  type UpscaleRunRef,
} from "./wallpaper-backfill-classify"

describe("pathBasename", () => {
  test("returns the final segment", () => {
    expect(pathBasename("/home/walton/Pictures/x/aine-L01.png")).toBe("aine-L01.png")
  })
  test("no slash → whole string", () => {
    expect(pathBasename("aine-L01.png")).toBe("aine-L01.png")
  })
  test("trailing slash is trimmed before taking the segment", () => {
    expect(pathBasename("/a/b/")).toBe("b")
  })
  test("empty string → empty string", () => {
    expect(pathBasename("")).toBe("")
  })
})

describe("findConfidentWallpaperSource", () => {
  const runs: readonly UpscaleRunRef[] = [
    {
      inputImagePath: "/home/walton/Pictures/Generated/echo-explore/echo-1023.png",
      outputImagePath:
        "/home/walton/Pictures/Wallpapers/Personas/Echo/echo-L01-20260704T135702Z.png",
    },
    {
      inputImagePath: "/tmp/aine-src.png",
      outputImagePath:
        "/home/walton/Pictures/Wallpapers/Personas/Aine/aine-L01-20260621T013841Z.png",
    },
  ]

  test("output basename EXACTLY matching the delivered filename → its input path", () => {
    expect(
      findConfidentWallpaperSource({
        deliveredFilename: "echo-L01-20260704T135702Z.png",
        upscaleRuns: runs,
      })
    ).toBe("/home/walton/Pictures/Generated/echo-explore/echo-1023.png")
  })

  test("re-delivered wallpaper (different timestamp than any recorded output) → null", () => {
    expect(
      findConfidentWallpaperSource({
        deliveredFilename: "aine-L01-20260623T014126Z.png",
        upscaleRuns: runs,
      })
    ).toBeNull()
  })

  test("basename match but empty input path → null (no usable source)", () => {
    expect(
      findConfidentWallpaperSource({
        deliveredFilename: "x-L01.png",
        upscaleRuns: [{ inputImagePath: null, outputImagePath: "/o/x-L01.png" }],
      })
    ).toBeNull()
  })

  test("empty delivered filename → null", () => {
    expect(findConfidentWallpaperSource({ deliveredFilename: "", upscaleRuns: runs })).toBeNull()
  })

  test("no runs → null", () => {
    expect(
      findConfidentWallpaperSource({ deliveredFilename: "echo-L01.png", upscaleRuns: [] })
    ).toBeNull()
  })
})

describe("classifyWallpaperSource", () => {
  test("confident source path that survives → source-survives{path}", () => {
    expect(
      classifyWallpaperSource({ confidentSourcePath: "/src/a.png", sourceSurvives: true })
    ).toEqual({ kind: "source-survives", sourcePath: "/src/a.png" })
  })

  test("confident source path that does NOT survive → source-gone", () => {
    expect(
      classifyWallpaperSource({ confidentSourcePath: "/src/a.png", sourceSurvives: false })
    ).toEqual({ kind: "source-gone" })
  })

  test("no confident source (null) → source-gone regardless of survives flag", () => {
    expect(classifyWallpaperSource({ confidentSourcePath: null, sourceSurvives: true })).toEqual({
      kind: "source-gone",
    })
  })

  test("empty confident source path → source-gone", () => {
    expect(classifyWallpaperSource({ confidentSourcePath: "", sourceSurvives: true })).toEqual({
      kind: "source-gone",
    })
  })
})
