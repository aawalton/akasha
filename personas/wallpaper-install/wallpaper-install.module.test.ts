import { describe, expect, test } from "bun:test"
import { planWallpaperInstall } from "./wallpaper-install.module.code.ts"

const NEW_NAME = "aria-L03-20260115T103000Z.png"

const DIR_ENTRIES = [
  NEW_NAME,
  "aria-L03-20250101T000000Z.png",
  "aria-L04-20250101T000000Z.png",
  "nova-L03-20250101T000000Z.png",
  "notes.txt",
]

describe("planWallpaperInstall", () => {
  test("writes the new wallpaper into the folder given", () => {
    const plan = planWallpaperInstall({
      dirEntries: DIR_ENTRIES,
      wallpaperDir: "/wall",
      slug: "aria",
      level: 3,
      newName: NEW_NAME,
    })
    expect(plan.writePath).toBe(`/wall/${NEW_NAME}`)
  })

  test("takes away only the same persona's older wallpaper at the same level", () => {
    const plan = planWallpaperInstall({
      dirEntries: DIR_ENTRIES,
      wallpaperDir: "/wall",
      slug: "aria",
      level: 3,
      newName: NEW_NAME,
    })
    expect(plan.deletePaths).toEqual(["/wall/aria-L03-20250101T000000Z.png"])
  })

  test("leaves a file the wallpaper name shape does not fit alone", () => {
    const plan = planWallpaperInstall({
      dirEntries: ["notes.txt", "README"],
      wallpaperDir: "/wall",
      slug: "aria",
      level: 3,
      newName: NEW_NAME,
    })
    expect(plan.deletePaths).toEqual([])
  })

  test("reads a folder written with a trailing slash the same way", () => {
    const plan = planWallpaperInstall({
      dirEntries: [],
      wallpaperDir: "/wall/",
      slug: "aria",
      level: 3,
      newName: NEW_NAME,
    })
    expect(plan.writePath).toBe(`/wall/${NEW_NAME}`)
  })
})
