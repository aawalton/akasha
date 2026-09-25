import { expect, test } from "bun:test"
import { folderFrom } from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import type {
  Declaring,
  Standing,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import {
  HOLDS,
  pagesOfTheTypeAbove,
} from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/pages-of-the-type-above/pages-of-the-type-above.folder-shape.code.ts"
import { page } from "akasha/page/page.page-type.ts"

const ABOVE = "akasha/check-code"

const FOLDER = `${ABOVE}/pages`

const PAGE_TYPES = new Set<string>(["page-type", "check-code", "check-model"])

const CHECK_CODE: Declaring = { slug: "check-code", propertySlugs: new Set<string>() }

function over(deep: readonly string[]): (names: readonly string[]) => Standing {
  return folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    declaring: (at) => (at === ABOVE ? CHECK_CODE : null),
    deep,
  })
}

const folder = over([])

test("the shape holds the name the page page type gathers its pages under", () => {
  expect(HOLDS).toEqual([page.pluralSlug])
})

test("pages of the type above sitting as flat files take the shape", () => {
  expect(pagesOfTheTypeAbove(folder(["one.check-code.ts", "two.check-code.ts"]))).toEqual([])
})

test("one page of that type to a subfolder takes the shape too", () => {
  const held = over([
    "one/one.check-code.ts",
    "one/one.check-code.code.ts",
    "two/two.check-code.ts",
  ])
  expect(pagesOfTheTypeAbove(held([]))).toEqual([])
})

test("a folder holding no file at all takes the shape", () => {
  expect(pagesOfTheTypeAbove(folder([]))).toEqual([])
})

test("a page of another page type is refused, and the reason names it", () => {
  const said = pagesOfTheTypeAbove(folder(["one.check-code.ts", "two.check-model.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("not of `check-code`")
  expect(said[0]).toContain("two.check-model.ts")
})

test("a subfolder holding no page of that type is refused, and the reason names it", () => {
  const held = over(["one/notes.check-model.ts"])
  const said = pagesOfTheTypeAbove(held([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one")
})

function declaring(named: Readonly<Record<string, readonly string[]>>) {
  return folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    declaring: (at) => (at === ABOVE ? CHECK_CODE : null),
    deep: ["one/one.check-model.ts"],
    holds: (at) => (at === `${FOLDER}/one` ? ["check-model/one"] : []),
    declared: (at) => new Set<string>(named[at] ?? []),
  })
}

test("a subfolder holding a page that page type declares a part takes the shape", () => {
  const held = declaring({ [ABOVE]: ["check-model/one"] })
  expect(pagesOfTheTypeAbove(held([]))).toEqual([])
})

test("a subfolder holding a page that page type declares nowhere is refused", () => {
  const held = declaring({ [ABOVE]: ["check-model/other"] })
  const said = pagesOfTheTypeAbove(held([]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one")
})

test("a folder named pages above which no page type sits is refused", () => {
  const held = folderFrom({ folder: "akasha/schema/pages", pageTypes: PAGE_TYPES })
  expect(pagesOfTheTypeAbove(held([]))).toEqual(["the folder above holds no page type of its own"])
})

test("a page carrying a file beside it is refused, and the reason names that page", () => {
  const said = pagesOfTheTypeAbove(folder(["one.check-code.ts", "one.check-code.code.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one.check-code")
  expect(said[0]).toContain("a folder of its own")
})

test("a file held uncommitted beside a page leaves that page taking the shape", () => {
  const names = ["one.check-code.ts", "one.check-code.test.uncommitted.jsonl"]
  expect(pagesOfTheTypeAbove(folder(names))).toEqual([])
})

test("a page file beside a page folder is refused, and the reason names the file", () => {
  const held = over(["two/two.check-code.ts"])
  const said = pagesOfTheTypeAbove(held(["one.check-code.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("page files alone or page folders alone")
  expect(said[0]).toContain("one.check-code.ts")
})

test("a file that is neither a page nor sits beside one is refused", () => {
  const said = pagesOfTheTypeAbove(folder(["one.check-code.ts", "notes.txt"]))
  expect(said.some((each) => each.includes("notes.txt"))).toBe(true)
})
