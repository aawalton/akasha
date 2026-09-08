import { describe, expect, test } from "bun:test"
import {
  classifyWallpaperSource,
  findConfidentWallpaperSource,
  pathBasename,
  type UpscaleRunRef,
} from "./wallpaper-backfill-classify.module.code.ts"

const RUNS: readonly UpscaleRunRef[] = [
  { inputImagePath: "/src/other.png", outputImagePath: "/out/other.png" },
  { inputImagePath: "/src/aria.png", outputImagePath: "/out/delivered.png" },
  { inputImagePath: null, outputImagePath: "/out/orphan.png" },
]

describe("pathBasename", () => {
  test("takes the last piece of a path", () => {
    expect(pathBasename("/a/b/c.png")).toBe("c.png")
  })

  test("passes over a trailing slash", () => {
    expect(pathBasename("/a/b/")).toBe("b")
  })

  test("answers a bare name unchanged", () => {
    expect(pathBasename("c.png")).toBe("c.png")
  })
})

describe("findConfidentWallpaperSource", () => {
  test("names the input of the run that delivered the file", () => {
    expect(
      findConfidentWallpaperSource({ deliveredFilename: "delivered.png", upscaleRuns: RUNS })
    ).toBe("/src/aria.png")
  })

  test("answers nothing where no run delivered the file", () => {
    expect(
      findConfidentWallpaperSource({ deliveredFilename: "missing.png", upscaleRuns: RUNS })
    ).toBeNull()
  })

  test("answers nothing where the delivery names no file", () => {
    expect(findConfidentWallpaperSource({ deliveredFilename: "", upscaleRuns: RUNS })).toBeNull()
  })

  test("passes over a run whose input is gone", () => {
    expect(
      findConfidentWallpaperSource({ deliveredFilename: "orphan.png", upscaleRuns: RUNS })
    ).toBeNull()
  })
})

describe("classifyWallpaperSource", () => {
  test("says the source survives where it is named and still there", () => {
    expect(
      classifyWallpaperSource({ confidentSourcePath: "/src/aria.png", sourceSurvives: true })
    ).toEqual({ kind: "source-survives", sourcePath: "/src/aria.png" })
  })

  test("says the source is gone where it is named but no longer there", () => {
    expect(
      classifyWallpaperSource({ confidentSourcePath: "/src/aria.png", sourceSurvives: false })
    ).toEqual({ kind: "source-gone" })
  })

  test("says the source is gone where none was named", () => {
    expect(classifyWallpaperSource({ confidentSourcePath: null, sourceSurvives: true })).toEqual({
      kind: "source-gone",
    })
  })
})
