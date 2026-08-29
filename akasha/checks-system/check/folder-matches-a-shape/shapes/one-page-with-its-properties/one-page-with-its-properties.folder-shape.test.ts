import { expect, test } from "bun:test"
import { heldIn } from "../../../../../pages-system/page/page-file-name.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"
import { onePageWithItsProperties } from "./one-page-with-its-properties.folder-shape.code.ts"

const FOLDER = "akasha/one"

const PAGE_TYPES = new Set<string>(["page-type", "domain", "module", "check"])

const FILE_PROPERTIES = new Set<string>(["code", "test"])

export function standing(names: readonly string[]): Standing {
  const held = names.map((each) => heldIn(`${FOLDER}/${each}`, PAGE_TYPES, FILE_PROPERTIES))
  return {
    folder: FOLDER,
    files: held.map((each) => each.path),
    deep: [],
    pages: held.filter((each) => each.kind === "page"),
    properties: held.filter((each) => each.kind === "property"),
    strays: held.filter((each) => each.kind === "stray"),
    entered: () => false,
    extending: () => false,
  }
}

test("a folder holding no file at all takes the shape", () => {
  expect(onePageWithItsProperties(standing([]))).toEqual([])
})

test("a file that is neither a page nor stands beside one is refused", () => {
  const said = onePageWithItsProperties(standing(["one.domain.ts", "notes.txt"]))
  expect(said.some((each) => each.includes("notes.txt"))).toBe(true)
})

test("one page with the files standing beside it takes the shape", () => {
  const said = onePageWithItsProperties(
    standing(["one.check.ts", "one.check.code.ts", "one.check.test.ts"])
  )
  expect(said).toEqual([])
})

test("two pages are refused, and the reason names them", () => {
  const said = onePageWithItsProperties(standing(["one.check.ts", "two.check.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 pages rather than one")
})

test("a file standing beside a page that is elsewhere is refused", () => {
  const said = onePageWithItsProperties(standing(["one.check.ts", "two.check.code.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("stand beside no page here")
  expect(said[0]).toContain("two.check.code.ts")
})

test("a folder holding only files standing beside a page absent here holds no page", () => {
  expect(onePageWithItsProperties(standing(["one.check.code.ts"]))).toEqual(["it holds no page"])
})
