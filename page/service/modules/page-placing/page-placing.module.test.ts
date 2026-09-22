import { expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type Landing,
  placing,
} from "akasha/page/service/modules/page-placing/page-placing.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const BYTES = new Uint8Array([0x89, 0x50, 0x4e, 0x47])

const AN_IMAGE = {
  pageTypeSlug: "image",
  slug: "image-d0d33edb5da5400c",
  key: "bytes",
  ending: "png",
  bytes: BYTES,
}

function landing(): Landing & { readonly wrote: string[]; readonly kept: [string, Value][] } {
  const wrote: string[] = []
  const kept: [string, Value][] = []
  return {
    wrote,
    kept,
    write: (at) => {
      wrote.push(at)
    },
    remember: (page, values) => {
      kept.push([page, values])
    },
  }
}

test("bytes land beside the page under the ending named, and the ending is remembered", () => {
  const held = landing()
  const done = placing(ROOT, AN_IMAGE, held)
  const at =
    "infrastructure/inference/generation/image/pages/image-d0d33edb5da5400c.image.bytes.uncommitted.png"
  expect(done).toEqual({ placed: at })
  expect(held.wrote).toEqual([at])
  expect(held.kept).toEqual([[at.replace(".bytes.uncommitted.png", ".ts"), { bytes: "png" }]])
})

test("an ending the property does not name is refused", () => {
  const held = landing()
  const done = placing(ROOT, { ...AN_IMAGE, ending: "gif" }, held)
  expect("refused" in done && done.refused).toContain("`gif` is none of those")
  expect(held.wrote).toEqual([])
})

test("a key the page type has no property for is refused", () => {
  const done = placing(ROOT, { ...AN_IMAGE, key: "negative" }, landing())
  expect("refused" in done && done.refused).toContain("has no")
})

test("a key naming a property that keeps no file is refused", () => {
  const done = placing(ROOT, { ...AN_IMAGE, key: "title" }, landing())
  expect("refused" in done && done.refused).toContain("names no file property")
})

test("a key naming a committed file is refused", () => {
  const done = placing(ROOT, { ...AN_IMAGE, key: "referencedBy" }, landing())
  expect("refused" in done && done.refused).toContain("is committed")
})

test("a slug naming no page is refused", () => {
  const done = placing(ROOT, { ...AN_IMAGE, slug: "image-nobody" }, landing())
  expect("refused" in done && done.refused).toContain("is no page here")
})
