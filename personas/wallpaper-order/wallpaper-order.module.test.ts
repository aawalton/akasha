import { expect, test } from "bun:test"
import {
  orderedWallpaperSlugs,
  stampMsOf,
  type WallpaperRow,
} from "./wallpaper-order.module.code.ts"

const PNG = "png"

function held(rows: readonly WallpaperRow[]): readonly string[] {
  return orderedWallpaperSlugs(rows)
}

test("the persona written to most recently comes first", () => {
  expect(
    held([
      { id: "a", slug: "abby", wallpaper: PNG, lastMessagedAt: "2026-09-06T19:00:00.000Z" },
      { id: "b", slug: "amy", wallpaper: PNG, lastMessagedAt: "2026-09-06T19:12:00.000Z" },
      { id: "c", slug: "ali", wallpaper: PNG, lastMessagedAt: "2026-09-06T19:06:00.000Z" },
    ])
  ).toEqual(["amy", "ali", "abby"])
})

test("a persona carrying no wallpaper is passed over", () => {
  expect(
    held([
      { id: "a", slug: "akasha", lastMessagedAt: "2026-09-06T19:59:00.000Z" },
      { id: "b", slug: "amy", wallpaper: PNG, lastMessagedAt: "2026-09-06T19:12:00.000Z" },
    ])
  ).toEqual(["amy"])
})

test("a persona nobody wrote to sorts behind every persona somebody did", () => {
  expect(
    held([
      { id: "a", slug: "vera", wallpaper: PNG },
      { id: "b", slug: "amy", wallpaper: PNG, lastMessagedAt: "2026-09-06T19:12:00.000Z" },
    ])
  ).toEqual(["amy", "vera"])
})

test("a stamp nothing can read counts as no stamp rather than as the newest", () => {
  expect(
    held([
      { id: "a", slug: "vera", wallpaper: PNG, lastMessagedAt: "not a time at all" },
      { id: "b", slug: "amy", wallpaper: PNG, lastMessagedAt: "2026-09-06T19:12:00.000Z" },
    ])
  ).toEqual(["amy", "vera"])
})

test("two personas nobody wrote to are ordered by their page id", () => {
  expect(
    held([
      { id: "b", slug: "zeli", wallpaper: PNG },
      { id: "a", slug: "abby", wallpaper: PNG },
    ])
  ).toEqual(["abby", "zeli"])
})

test("two personas written to at the same moment are ordered by their page id", () => {
  const sameMoment = "2026-09-06T19:12:00.000Z"
  expect(
    held([
      { id: "b", slug: "zeli", wallpaper: PNG, lastMessagedAt: sameMoment },
      { id: "a", slug: "abby", wallpaper: PNG, lastMessagedAt: sameMoment },
    ])
  ).toEqual(["abby", "zeli"])
})

test("a persona carrying no slug is passed over", () => {
  expect(held([{ id: "a", wallpaper: PNG }])).toEqual([])
})

test("a stamp nothing can read reads as the moment behind every other moment", () => {
  expect(stampMsOf("not a time at all")).toBe(Number.NEGATIVE_INFINITY)
  expect(stampMsOf(null)).toBe(Number.NEGATIVE_INFINITY)
  expect(stampMsOf(undefined)).toBe(Number.NEGATIVE_INFINITY)
  expect(stampMsOf("2026-09-06T19:12:00.000Z")).toBe(Date.parse("2026-09-06T19:12:00.000Z"))
})
