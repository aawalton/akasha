import { expect, test } from "bun:test"
import { orderedWallpaperSlugs, type PersonaCoverRow } from "./wallpaper-candidates.module.code.ts"

const PNG = "png"

function held(rows: readonly PersonaCoverRow[]): readonly string[] {
  return orderedWallpaperSlugs(rows)
}

test("the persona written to most recently comes first", () => {
  expect(
    held([
      { id: "a", slug: "abby", mobileWallpaper: PNG, lastMessagedAt: "2026-09-06T19:00:00.000Z" },
      { id: "b", slug: "amy", mobileWallpaper: PNG, lastMessagedAt: "2026-09-06T19:12:00.000Z" },
      { id: "c", slug: "ali", mobileWallpaper: PNG, lastMessagedAt: "2026-09-06T19:06:00.000Z" },
    ])
  ).toEqual(["amy", "ali", "abby"])
})

test("a persona carrying no wallpaper is passed over", () => {
  expect(
    held([
      { id: "a", slug: "akasha", lastMessagedAt: "2026-09-06T19:59:00.000Z" },
      { id: "b", slug: "amy", mobileWallpaper: PNG, lastMessagedAt: "2026-09-06T19:12:00.000Z" },
    ])
  ).toEqual(["amy"])
})

test("a persona nobody wrote to sorts behind every persona somebody did", () => {
  expect(
    held([
      { id: "a", slug: "vera", mobileWallpaper: PNG },
      { id: "b", slug: "amy", mobileWallpaper: PNG, lastMessagedAt: "2026-09-06T19:12:00.000Z" },
    ])
  ).toEqual(["amy", "vera"])
})

test("a stamp nothing can read counts as no stamp rather than as the newest", () => {
  expect(
    held([
      { id: "a", slug: "vera", mobileWallpaper: PNG, lastMessagedAt: "not a time at all" },
      { id: "b", slug: "amy", mobileWallpaper: PNG, lastMessagedAt: "2026-09-06T19:12:00.000Z" },
    ])
  ).toEqual(["amy", "vera"])
})

test("two personas nobody wrote to are ordered by their page id", () => {
  expect(
    held([
      { id: "b", slug: "zeli", mobileWallpaper: PNG },
      { id: "a", slug: "abby", mobileWallpaper: PNG },
    ])
  ).toEqual(["abby", "zeli"])
})

test("a persona carrying no slug is passed over", () => {
  expect(held([{ id: "a", mobileWallpaper: PNG }])).toEqual([])
})
