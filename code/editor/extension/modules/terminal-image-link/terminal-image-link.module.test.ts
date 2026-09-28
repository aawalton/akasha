import { expect, test } from "bun:test"
import {
  bytesPathOf,
  bytesUrlOf,
  imageLinksIn,
} from "akasha/code/editor/extension/modules/terminal-image-link/terminal-image-link.module.code.ts"

const SLUG = "image-30fe86b3d8330ee7"

const PAGES = "/root/infrastructure/inference/generation/image/pages"

test("a line the renderer flattened names the image by its address", () => {
  const line = `  Turn 1 in the new style (image/${SLUG})`
  expect(imageLinksIn(line)).toEqual([
    { startIndex: 27, length: 28, tooltip: "Open image", slug: SLUG },
  ])
})

test("every address on a line is a link of its own", () => {
  const line = `![a](image/${SLUG}) and ![b](image/image-0a82c1925143d0dc)`
  expect(imageLinksIn(line).map((link) => link.slug)).toEqual([SLUG, "image-0a82c1925143d0dc"])
})

test("a slug too short or a longer word is no link", () => {
  expect(imageLinksIn("image/image-30fe86b3")).toEqual([])
  expect(imageLinksIn(`image/${SLUG}ff`)).toEqual([])
  expect(imageLinksIn(`myimage/${SLUG}`)).toEqual([])
})

test("the bytes are found under whichever ending they were landed with", () => {
  const jpg = `${PAGES}/${SLUG}.image.bytes.uncommitted.jpg`
  expect(bytesPathOf("/root", SLUG, (at) => at === jpg)).toBe(jpg)
})

test("bytes on no ending answer nothing", () => {
  expect(bytesPathOf("/root", SLUG, () => false)).toBe(undefined)
})

test("the site serves the bytes by the image's slug", () => {
  expect(bytesUrlOf(SLUG)).toBe(`https://alanwalton.com/api/page-file/image/${SLUG}/bytes`)
})
