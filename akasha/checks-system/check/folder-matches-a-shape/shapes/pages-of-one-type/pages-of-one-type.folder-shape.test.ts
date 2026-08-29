import { expect, test } from "bun:test"
import { heldIn } from "../../../../../pages-system/page/page-file-name.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"
import { pagesOfOneType } from "./pages-of-one-type.folder-shape.code.ts"

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
  expect(pagesOfOneType(standing([]))).toEqual([])
})

test("a file that is neither a page nor stands beside one is refused", () => {
  const said = pagesOfOneType(standing(["one.domain.ts", "notes.txt"]))
  expect(said.some((each) => each.includes("notes.txt"))).toBe(true)
})

test("pages of one page type and nothing else take the shape", () => {
  expect(pagesOfOneType(standing(["one.domain.ts", "two.domain.ts"]))).toEqual([])
})

test("pages of two page types are refused, and the reason names both", () => {
  const said = pagesOfOneType(standing(["one.domain.ts", "two.module.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("2 page types: domain, module")
})

test("a file standing beside a page is refused, because this shape holds pages alone", () => {
  const said = pagesOfOneType(standing(["one.module.ts", "one.module.code.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("stand beside a page")
  expect(said[0]).toContain("one.module.code.ts")
})

test("a folder holding files but no page at all is refused as holding no page", () => {
  expect(pagesOfOneType(standing(["one.module.code.ts"]))[0]).toContain("stand beside a page")
})
