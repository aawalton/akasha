import { expect, test } from "bun:test"
import {
  chosenIn,
  type PersonaWallpaper,
  type Ran,
  settingIn,
} from "./desktop-wallpaper-setting.module.code.ts"

const ROOT = "/repo"

const PNG = "png"

function persona(
  id: string,
  slug: string,
  wallpaper: string | null,
  lastMessagedAt: string | null
): PersonaWallpaper {
  return { id, slug, wallpaper, lastMessagedAt, pagePath: `personas/${slug}/${slug}.persona.ts` }
}

function wallpaperAt(slug: string): string {
  return `${ROOT}/personas/${slug}/${slug}.persona.desktop-wallpaper.png`
}

function onDisk(...slugs: readonly string[]): (at: string) => boolean {
  const there = new Set(slugs.map(wallpaperAt))
  return (at) => there.has(at)
}

test("the persona written to most recently is the persona chosen", () => {
  const personas = [
    persona("a", "abby", PNG, "2026-09-06T19:00:00.000Z"),
    persona("b", "amy", PNG, "2026-09-06T19:12:00.000Z"),
    persona("c", "ali", PNG, "2026-09-06T19:06:00.000Z"),
  ]
  expect(chosenIn(ROOT, personas, onDisk("abby", "amy", "ali"))).toEqual({
    slug: "amy",
    path: wallpaperAt("amy"),
  })
})

test("two personas written to at the same moment are settled by their page id", () => {
  const sameMoment = "2026-09-06T19:12:00.000Z"
  const personas = [persona("b", "zeli", PNG, sameMoment), persona("a", "abby", PNG, sameMoment)]
  expect(chosenIn(ROOT, personas, onDisk("zeli", "abby"))).toEqual({
    slug: "abby",
    path: wallpaperAt("abby"),
  })
})

test("a persona carrying no desktop wallpaper is passed over", () => {
  const personas = [
    persona("a", "akasha", null, "2026-09-06T19:59:00.000Z"),
    persona("b", "amy", PNG, "2026-09-06T19:12:00.000Z"),
  ]
  expect(chosenIn(ROOT, personas, onDisk("akasha", "amy"))).toEqual({
    slug: "amy",
    path: wallpaperAt("amy"),
  })
})

test("a persona whose declared wallpaper is not on disk is passed over", () => {
  const personas = [
    persona("a", "akasha", PNG, "2026-09-06T19:59:00.000Z"),
    persona("b", "amy", PNG, "2026-09-06T19:12:00.000Z"),
  ]
  expect(chosenIn(ROOT, personas, onDisk("amy"))).toEqual({
    slug: "amy",
    path: wallpaperAt("amy"),
  })
})

test("no wallpaper on disk anywhere is chosen as nothing", () => {
  const personas = [persona("a", "amy", PNG, "2026-09-06T19:12:00.000Z")]
  expect(chosenIn(ROOT, personas, onDisk())).toBeNull()
})

test("a persona nobody wrote to is chosen where nobody wrote to anybody", () => {
  const personas = [persona("a", "amy", PNG, null)]
  expect(chosenIn(ROOT, personas, onDisk("amy"))).toEqual({
    slug: "amy",
    path: wallpaperAt("amy"),
  })
})

test("the command is handed the path of the persona chosen", () => {
  const pointedAt: string[] = []
  const run = (at: string): Ran => {
    pointedAt.push(at)
    return { status: 0, said: "set" }
  }
  const setting = settingIn(ROOT, run, { slug: "amy", path: wallpaperAt("amy") })
  expect(pointedAt).toEqual([wallpaperAt("amy")])
  expect(setting.status).toBe(0)
  expect(setting.said).toContain("amy")
})

test("choosing nothing exits non-zero without running the command", () => {
  const pointedAt: string[] = []
  const run = (at: string): Ran => {
    pointedAt.push(at)
    return { status: 0, said: "set" }
  }
  const setting = settingIn(ROOT, run, null)
  expect(pointedAt).toEqual([])
  expect(setting.status).not.toBe(0)
  expect(setting.said).toContain("desktop wallpaper")
})
