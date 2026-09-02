import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import { modulesOnly } from "./modules-only.folder-shape.code.ts"

const FOLDER = "akasha/checks/modules"

const OTHER = "akasha/checks/mods"

const PAGE_TYPES = new Set<string>(["module", "domain"])

const folder = folderFrom({ folder: FOLDER, pageTypes: PAGE_TYPES })

const otherwise = folderFrom({ folder: OTHER, pageTypes: PAGE_TYPES })

test("a folder named modules holding no file of its own takes the shape", () => {
  expect(modulesOnly(folder([]))).toEqual([])
})

test("a folder holding a page is refused, and the reason names it", () => {
  const said = modulesOnly(folder(["one.module.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one.module.ts")
})

test("a folder holding a file that is no page is refused too", () => {
  expect(modulesOnly(folder(["notes.txt"]))).toHaveLength(1)
})

test("the refusal counts every file sitting in it", () => {
  const said = modulesOnly(folder(["one.module.ts", "two.module.ts", "notes.txt"]))
  expect(said[0]).toContain("3 files")
})

test("a folder named otherwise is refused, and the reason names both", () => {
  const said = modulesOnly(otherwise([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`mods`")
  expect(said[0]).toContain("`modules`")
})
