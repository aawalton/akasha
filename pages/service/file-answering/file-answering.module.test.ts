import { expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { filing } from "./file-answering.module.code.ts"

const ROOT = join(import.meta.dir, "..", "..", "..")

const A_WALLPAPER = { pageTypeSlug: "persona", slug: "amy", key: "mobileWallpaper" }

const A_PICTURE_AT = "personas/amy/amy.persona.mobile-wallpaper.png"

const PNG = [0x89, 0x50, 0x4e, 0x47]

test("a page's file property is answered as the bytes beside that page", () => {
  const said = filing(ROOT, A_WALLPAPER)
  expect("bytes" in said).toBe(true)
  if (!("bytes" in said)) return
  expect(said.path).toBe("personas/amy/amy.persona.ts")
  expect(Array.from(said.bytes.slice(0, 4))).toEqual(PNG)
  expect(Array.from(said.bytes)).toEqual(Array.from(readFileSync(join(ROOT, A_PICTURE_AT))))
})

test("a key the page type carries no property for is refused", () => {
  const said = filing(ROOT, { ...A_WALLPAPER, key: "wallpaperOfTheDay" })
  expect("refused" in said && said.refused).toContain("carries no")
})

test("a key naming a property that keeps no file is refused", () => {
  const said = filing(ROOT, { ...A_WALLPAPER, key: "purpose" })
  expect("refused" in said && said.refused).toContain("names no file property")
})

test("a file property held outside the commit is refused", () => {
  const said = filing(ROOT, { pageTypeSlug: "code-check", slug: "typecheck", key: "entries" })
  expect("refused" in said && said.refused).toContain("outside the commit")
})

test("a property outside the commit that keeps no file is refused for keeping no file", () => {
  const said = filing(ROOT, { ...A_WALLPAPER, key: "lastMessagedAt" })
  expect("refused" in said && said.refused).toContain("names no file property")
})

test("a slug naming no page is refused", () => {
  const said = filing(ROOT, { ...A_WALLPAPER, slug: "nobody-by-this-name" })
  expect("refused" in said && said.refused).toContain("is no page here")
})

test("a page stating no such file is refused rather than answered empty", () => {
  const said = filing(ROOT, { pageTypeSlug: "persona", slug: "akasha", key: "mobileWallpaper" })
  expect("refused" in said && said.refused).toContain("states no")
})
