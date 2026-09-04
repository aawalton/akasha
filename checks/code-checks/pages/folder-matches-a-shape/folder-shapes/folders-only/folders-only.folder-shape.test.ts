import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import { foldersOnly } from "./folders-only.folder-shape.code.ts"

const FOLDER = "akasha/one"

const folder = folderFrom({ folder: FOLDER, pageTypes: new Set<string>(["domain", "module"]) })

test("a folder holding no file of its own takes the shape", () => {
  expect(foldersOnly(folder([]))).toEqual([])
})

test("a folder holding a page fails it", () => {
  const said = foldersOnly(folder(["one.domain.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one.domain.ts")
})

test("a folder holding a file that is no page fails it too", () => {
  expect(foldersOnly(folder(["notes.txt"]))).toHaveLength(1)
})

test("the refusal counts every file sitting in it", () => {
  const said = foldersOnly(folder(["one.domain.ts", "two.module.ts", "notes.txt"]))
  expect(said[0]).toContain("3 files")
})
