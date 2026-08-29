import { expect, test } from "bun:test"
import { heldIn } from "../../../../../pages-system/page/page-file-name.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"
import { pageWithItsParts } from "./page-with-its-parts.folder-shape.code.ts"

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
  }
}

test("a folder holding no file at all takes the shape", () => {
  expect(pageWithItsParts(standing([]))).toEqual([])
})

test("a file that is neither a page nor stands beside one is refused", () => {
  const said = pageWithItsParts(standing(["one.domain.ts", "notes.txt"]))
  expect(said.some((each) => each.includes("notes.txt"))).toBe(true)
})

test("the page named for the folder beside its modules takes the shape", () => {
  const said = pageWithItsParts(
    standing(["one.domain.ts", "held.module.ts", "held.module.code.ts", "held.module.test.ts"])
  )
  expect(said).toEqual([])
})

test("no page named for the folder is refused, naming the folder", () => {
  const said = pageWithItsParts(standing(["held.module.ts", "held.module.code.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("no page here is named `one`")
})

test("a page beside the headline that is not a module is refused", () => {
  const said = pageWithItsParts(standing(["one.domain.ts", "two.domain.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("are not modules")
  expect(said[0]).toContain("two.domain.ts")
})

test("a file standing beside no page here is refused", () => {
  const said = pageWithItsParts(standing(["one.domain.ts", "gone.module.code.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("stand beside no page here")
})
