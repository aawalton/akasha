import { expect, test } from "bun:test"
import { folderFor } from "./page-type-folder.module.code.ts"

const CHANGE = { slug: "change", pluralSlug: "changes" }

test("a plural the parent's slug opens is the folder with that slug dropped", () => {
  expect(folderFor("change-atomic", CHANGE)).toBe("atomic")
  expect(folderFor("change-refactor", CHANGE)).toBe("refactor")
  expect(folderFor("change-partial", CHANGE)).toBe("partial")
})

test("a page type stating its slug as its plural is named for that slug", () => {
  expect(folderFor("change-kinds", CHANGE)).toBe("kinds")
})

test("the parent's plural is tried before the parent's slug", () => {
  expect(folderFor("changes-atomic", CHANGE)).toBe("atomic")
})

test("a plural the parent's name does not open is the folder whole", () => {
  expect(folderFor("domains", { slug: "akasha", pluralSlug: null })).toBe("domains")
  expect(folderFor("seats", CHANGE)).toBe("seats")
})

test("the folders the tree already carries are answered as they are", () => {
  expect(folderFor("page-types", { slug: "page", pluralSlug: "pages" })).toBe("types")
  expect(folderFor("model-families", { slug: "model", pluralSlug: "models" })).toBe("families")
  expect(folderFor("all-about-alan-topics", { slug: "all-about-alan", pluralSlug: null })).toBe(
    "topics"
  )
  expect(folderFor("context-warrants", { slug: "context", pluralSlug: null })).toBe("warrants")
})

test("a name is dropped only where a `-` follows it", () => {
  expect(folderFor("changes", CHANGE)).toBe("changes")
  expect(folderFor("changeling", CHANGE)).toBe("changeling")
})

test("a parent naming nothing drops nothing", () => {
  expect(folderFor("change-atomic", { slug: "", pluralSlug: null })).toBe("change-atomic")
})
