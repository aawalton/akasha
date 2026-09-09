import { expect, test } from "bun:test"
import { NOTHING_OVER, type World } from "../shadow/change-shadow.module.code.ts"
import { narrows, slugIn } from "./target-narrowing.module.code.ts"

const PARENTS: Readonly<Record<string, string>> = {
  "file-code": "change-target-subtype/file",
  "file-page": "change-target-subtype/file-code",
  "file-page-type": "change-target-subtype/file-page",
}

const LOOPED: Readonly<Record<string, string>> = {
  one: "change-target-subtype/two",
  two: "change-target-subtype/one",
}

function worldOf(named: Readonly<Record<string, string>>): World {
  return {
    root: "/nowhere",
    index: Object.assign({} as World["index"], {
      pageAt: (_pageType: string, slug: string) => {
        const held = named[slug]
        return held === undefined ? null : { parent: held }
      },
    }),
    textOf: () => null,
    bodyOf: () => null,
    under: () => [],
    base: () => null,
    over: NOTHING_OVER,
  }
}

const FILED = worldOf(PARENTS)

test("a subtype narrows itself", () => {
  expect(narrows(FILED, "file-page", "file-page")).toBe(true)
})

test("a subtype narrows every subtype its parent narrows", () => {
  expect(narrows(FILED, "file-page-type", "file")).toBe(true)
})

test("a subtype narrows no subtype beneath it", () => {
  expect(narrows(FILED, "file-code", "file-page")).toBe(false)
})

test("a subtype naming no parent narrows nothing above itself", () => {
  expect(narrows(FILED, "file", "file-code")).toBe(false)
})

test("a subtype the index files no page for narrows nothing above itself", () => {
  expect(narrows(FILED, "folder", "file")).toBe(false)
})

test("a chain of parents coming back on itself is walked once", () => {
  expect(narrows(worldOf(LOOPED), "one", "file")).toBe(false)
})

test("the slug is the part of an address past the page type", () => {
  expect(slugIn("change-target-subtype/file-page")).toBe("file-page")
})
