import { describe, expect, test } from "bun:test"
import { buildWallpaperImageRecord } from "./wallpaper-record.module.code.ts"

const INPUT = {
  personaSlug: "aria",
  personaTitle: "Aria",
  level: 7,
  stage: "dawn",
  esoDay: "2026-01-15",
  imagePath: "aria/wall.png",
}

describe("buildWallpaperImageRecord", () => {
  test("matches the wallpaper by the persona and the level together", () => {
    expect(buildWallpaperImageRecord(INPUT).where).toEqual([
      { key: "personaSlug", eq: "aria" },
      {
        or: [
          { key: "relationshipLevel", eq: 7 },
          { key: "relationshipLevel", eq: "7" },
        ],
      },
    ])
  })

  test("names the level and the stage in the title", () => {
    expect(buildWallpaperImageRecord(INPUT).set.title).toBe("Aria — wallpaper L07 (dawn)")
  })

  test("leaves a root out of the record where none is stated", () => {
    expect(Object.hasOwn(buildWallpaperImageRecord(INPUT).set, "imageRoot")).toBe(false)
  })

  test("carries a root that is stated", () => {
    expect(buildWallpaperImageRecord({ ...INPUT, imageRoot: "generated" }).set.imageRoot).toBe(
      "generated"
    )
  })
})
