import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import type { Declaring, Standing } from "../folder-shape.page-type.ts"
import { pagesOfTheTypeAbove } from "./pages-of-the-type-above.folder-shape.code.ts"

const ABOVE = "akasha/code-checks"

const FOLDER = `${ABOVE}/pages`

const PAGE_TYPES = new Set<string>(["page-type", "code-check", "model-check"])

const CODE_CHECK: Declaring = {
  slug: "code-check",
  pluralSlug: "code-checks",
  propertySlugs: new Set<string>(),
}

function over(deep: readonly string[]): (names: readonly string[]) => Standing {
  return folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    declaring: (at) => (at === ABOVE ? CODE_CHECK : null),
    deep,
  })
}

const folder = over([])

test("pages of the type above sitting as flat files take the shape", () => {
  expect(pagesOfTheTypeAbove(folder(["one.code-check.ts", "two.code-check.ts"]))).toEqual([])
})

test("one page of that type to a subfolder takes the shape too", () => {
  const held = over([
    "one/one.code-check.ts",
    "one/one.code-check.code.ts",
    "two/two.code-check.ts",
  ])
  expect(pagesOfTheTypeAbove(held([]))).toEqual([])
})

test("a folder holding no file at all takes the shape", () => {
  expect(pagesOfTheTypeAbove(folder([]))).toEqual([])
})

test("a page of another page type is refused, and the reason names it", () => {
  const said = pagesOfTheTypeAbove(folder(["one.code-check.ts", "two.model-check.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("not of `code-check`")
  expect(said[0]).toContain("two.model-check.ts")
})

test("a subfolder holding no page of that type is refused, and the reason names it", () => {
  const held = over(["one/notes.model-check.ts"])
  const said = pagesOfTheTypeAbove(held([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one")
})

test("a folder named otherwise is refused, and the reason names both", () => {
  const held = folderFrom({
    folder: `${ABOVE}/things`,
    pageTypes: PAGE_TYPES,
    declaring: (at) => (at === ABOVE ? CODE_CHECK : null),
  })
  const said = pagesOfTheTypeAbove(held(["one.code-check.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`things`")
  expect(said[0]).toContain("`pages`")
})

test("a folder named pages above which no page type sits is refused", () => {
  const held = folderFrom({ folder: "akasha/schema/pages", pageTypes: PAGE_TYPES })
  expect(pagesOfTheTypeAbove(held([]))).toEqual(["the folder above holds no page type of its own"])
})

test("a page carrying a file beside it is refused, and the reason names that page", () => {
  const said = pagesOfTheTypeAbove(folder(["one.code-check.ts", "one.code-check.code.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one.code-check")
  expect(said[0]).toContain("a folder of its own")
})

test("a page file beside a page folder is refused, and the reason names the file", () => {
  const held = over(["two/two.code-check.ts"])
  const said = pagesOfTheTypeAbove(held(["one.code-check.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("page files alone or page folders alone")
  expect(said[0]).toContain("one.code-check.ts")
})

test("a file that is neither a page nor sits beside one is refused", () => {
  const said = pagesOfTheTypeAbove(folder(["one.code-check.ts", "notes.txt"]))
  expect(said.some((each) => each.includes("notes.txt"))).toBe(true)
})
