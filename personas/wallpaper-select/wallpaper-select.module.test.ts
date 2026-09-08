import { describe, expect, test } from "bun:test"
import {
  selectFollowWallpaper,
  selectWallpaper,
  type WallpaperCandidate,
} from "./wallpaper-select.module.code.ts"

const CANDIDATES: readonly WallpaperCandidate[] = [
  { slug: "aria", level: 1, path: "aria-1.png" },
  { slug: "aria", level: 2, path: "aria-2.png" },
  { slug: "nova", level: 1, path: "nova-1.png" },
]

const first = () => 0
const last = (n: number) => n - 1

describe("selectWallpaper", () => {
  test("picks a persona before one of her wallpapers", () => {
    expect(selectWallpaper(CANDIDATES, {}, first)?.slug).toBe("aria")
    expect(selectWallpaper(CANDIDATES, {}, last)?.slug).toBe("nova")
  })

  test("picks among one persona's wallpapers once she is chosen", () => {
    expect(selectWallpaper(CANDIDATES, {}, first)?.path).toBe("aria-1.png")
  })

  test("matches an agent whatever case it is written in", () => {
    expect(selectWallpaper(CANDIDATES, { agent: "NOVA" }, first)?.slug).toBe("nova")
  })

  test("keeps only the level asked for", () => {
    expect(selectWallpaper(CANDIDATES, { level: 2 }, first)?.path).toBe("aria-2.png")
  })

  test("answers nothing where nothing matches", () => {
    expect(selectWallpaper(CANDIDATES, { agent: "ghost" }, first)).toBeNull()
  })
})

describe("selectFollowWallpaper", () => {
  test("takes the highest level at or under the one asked for", () => {
    expect(selectFollowWallpaper(CANDIDATES, 2)?.level).toBe(2)
    expect(selectFollowWallpaper(CANDIDATES, 1)?.level).toBe(1)
  })

  test("answers nothing where every level is above the one asked for", () => {
    expect(selectFollowWallpaper(CANDIDATES, 0)).toBeNull()
  })

  test("breaks a tie on level by the later path", () => {
    expect(selectFollowWallpaper(CANDIDATES, 1)?.path).toBe("nova-1.png")
  })
})
