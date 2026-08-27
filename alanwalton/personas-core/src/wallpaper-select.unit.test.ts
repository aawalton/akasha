import { describe, expect, test } from "bun:test"
import { selectFollowWallpaper, selectWallpaper, type WallpaperCandidate } from "./wallpaper-select"

const A1: WallpaperCandidate = { slug: "abby", level: 1, path: "/w/abby-L01-a.png" }
const A2: WallpaperCandidate = { slug: "abby", level: 2, path: "/w/abby-L02-a.png" }
const E1: WallpaperCandidate = { slug: "aelwyn", level: 1, path: "/w/aelwyn-L01-a.png" }
const ALL: readonly WallpaperCandidate[] = [A1, A2, E1]

function seqPick(indices: readonly number[]): (n: number) => number {
  let i = 0
  return () => indices[i++] ?? 0
}

const first = () => 0

describe("selectWallpaper", () => {
  test("no filter: uniform-random agent, then random within it", () => {
    expect(selectWallpaper(ALL, {}, first)).toEqual(A1)
  })

  test("no filter: second group is reachable via the group pick", () => {
    expect(selectWallpaper(ALL, {}, seqPick([1, 0]))).toEqual(E1)
  })

  test("agent filter restricts to that persona", () => {
    expect(selectWallpaper(ALL, { agent: "aelwyn" }, first)).toEqual(E1)
  })

  test("agent filter is case-insensitive", () => {
    expect(selectWallpaper(ALL, { agent: "Aelwyn" }, first)).toEqual(E1)
  })

  test("level filter keeps only matching levels across agents", () => {
    expect(selectWallpaper(ALL, { level: 1 }, first)).toEqual(A1)
  })

  test("agent + level selects within that agent/level", () => {
    expect(selectWallpaper(ALL, { agent: "abby", level: 2 }, first)).toEqual(A2)
  })

  test("returns null when the agent has no wallpaper at that level", () => {
    expect(selectWallpaper(ALL, { agent: "abby", level: 9 }, first)).toBeNull()
  })

  test("returns null for an unknown agent", () => {
    expect(selectWallpaper(ALL, { agent: "nobody" }, first)).toBeNull()
  })

  test("returns null for an empty candidate set", () => {
    expect(selectWallpaper([], {}, first)).toBeNull()
  })
})

const L1: WallpaperCandidate = { slug: "x", level: 1, path: "/w/x-L01-a.png" }
const L2: WallpaperCandidate = { slug: "x", level: 2, path: "/w/x-L02-a.png" }
const L3: WallpaperCandidate = { slug: "x", level: 3, path: "/w/x-L03-a.png" }

describe("selectFollowWallpaper", () => {
  test("only L01 filed, current level far above → applies L01 (graceful degradation)", () => {
    expect(selectFollowWallpaper([L1], 4)).toEqual(L1)
  })

  test("picks the highest filed level, not the most recent (level is the semantic axis)", () => {
    const auraNewerL1: WallpaperCandidate = { slug: "aura", level: 1, path: "/w/aura-L01-9999.png" }
    const auraL2: WallpaperCandidate = { slug: "aura", level: 2, path: "/w/aura-L02-0001.png" }
    expect(selectFollowWallpaper([auraNewerL1, auraL2], 5)).toEqual(auraL2)
  })

  test("filed level equal to current level is included", () => {
    expect(selectFollowWallpaper([L1, L2], 2)).toEqual(L2)
  })

  test("never selects above current level — excludes the too-deep file", () => {
    expect(selectFollowWallpaper([L1, L3], 2)).toEqual(L1)
  })

  test("returns null when the only filed wallpaper is above current level", () => {
    expect(selectFollowWallpaper([L3], 2)).toBeNull()
  })

  test("returns null for a persona with no filed wallpaper", () => {
    expect(selectFollowWallpaper([], 5)).toBeNull()
  })

  test("selection is independent of input order", () => {
    expect(selectFollowWallpaper([L2, L1], 5)).toEqual(L2)
    expect(selectFollowWallpaper([L1, L2], 5)).toEqual(L2)
  })
})
