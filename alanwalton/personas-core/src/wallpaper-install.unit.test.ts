import { describe, expect, test } from "bun:test"
import { join } from "node:path"
import { planWallpaperInstall } from "./wallpaper-install"

const DIR = "/home/walton/Pictures/Wallpapers/Personas/Aine"

describe("planWallpaperInstall", () => {
  test("overwrites only the same persona+level, leaving other levels", () => {
    const plan = planWallpaperInstall({
      dirEntries: ["aine-L01-20260101T000000Z.png", "aine-L02-20260101T000000Z.png"],
      wallpaperDir: DIR,
      slug: "aine",
      level: 1,
      newName: "aine-L01-20260601T120000Z.png",
    })
    expect(plan.writePath).toBe(join(DIR, "aine-L01-20260601T120000Z.png"))
    expect(plan.deletePaths).toEqual([join(DIR, "aine-L01-20260101T000000Z.png")])
  })

  test("never deletes another persona's files", () => {
    const plan = planWallpaperInstall({
      dirEntries: ["abby-L01-20260101T000000Z.png", "aine-L01-20260101T000000Z.png"],
      wallpaperDir: DIR,
      slug: "aine",
      level: 1,
      newName: "aine-L01-20260601T120000Z.png",
    })
    expect(plan.deletePaths).toEqual([join(DIR, "aine-L01-20260101T000000Z.png")])
  })

  test("skips non-conforming filenames (never guesses)", () => {
    const plan = planWallpaperInstall({
      dirEntries: ["aine-L01-20260101T000000Z.png", "scratch.png", "notes.txt", ".keep"],
      wallpaperDir: DIR,
      slug: "aine",
      level: 1,
      newName: "aine-L01-20260601T120000Z.png",
    })
    expect(plan.deletePaths).toEqual([join(DIR, "aine-L01-20260101T000000Z.png")])
  })

  test("does not list the new file itself for deletion", () => {
    const plan = planWallpaperInstall({
      dirEntries: ["aine-L01-20260601T120000Z.png"],
      wallpaperDir: DIR,
      slug: "aine",
      level: 1,
      newName: "aine-L01-20260601T120000Z.png",
    })
    expect(plan.deletePaths).toEqual([])
    expect(plan.writePath).toBe(join(DIR, "aine-L01-20260601T120000Z.png"))
  })

  test("empty directory yields a write and no deletes", () => {
    const plan = planWallpaperInstall({
      dirEntries: [],
      wallpaperDir: DIR,
      slug: "aine",
      level: 3,
      newName: "aine-L03-20260601T120000Z.png",
    })
    expect(plan.deletePaths).toEqual([])
    expect(plan.writePath).toBe(join(DIR, "aine-L03-20260601T120000Z.png"))
  })
})
