import { expect, test } from "bun:test"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { filing } from "akasha/pages/service/file-answering/file-answering.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const A_WALLPAPER = { pageTypeSlug: "persona", slug: "amy", key: "mobileWallpaper" }

const PNG_OPENS = [0x89, 0x50, 0x4e, 0x47]

const PNG_CLOSES = [0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82]

test("a page's file property is answered as the whole undecoded bytes", () => {
  const said = filing(ROOT, A_WALLPAPER)
  expect("bytes" in said).toBe(true)
  if (!("bytes" in said)) return
  expect({
    opens: Array.from(said.bytes.slice(0, PNG_OPENS.length)),
    closes: Array.from(said.bytes.slice(-PNG_CLOSES.length)),
  }).toEqual({ opens: PNG_OPENS, closes: PNG_CLOSES })
})

test("a key the page type has no property for is refused", () => {
  const said = filing(ROOT, { ...A_WALLPAPER, key: "wallpaperOfTheDay" })
  expect("refused" in said && said.refused).toContain("has no")
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
