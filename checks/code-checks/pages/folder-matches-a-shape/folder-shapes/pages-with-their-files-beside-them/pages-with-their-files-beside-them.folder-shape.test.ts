import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import type { Declaring, Standing } from "../folder-shape.page-type.ts"
import { pagesWithTheirFilesBesideThem } from "./pages-with-their-files-beside-them.folder-shape.code.ts"

const ABOVE = "akasha/code-checks"

const FOLDER = `${ABOVE}/pages`

const TS = ".ts"

const PAGE_TYPES = new Set<string>(["page-type", "code-check", "model-check"])

const CODE_CHECK: Declaring = {
  slug: "code-check",
  pluralSlug: "code-checks",
  propertySlugs: new Set<string>(),
}

function stating(tails: readonly string[]): Standing["parts"] {
  return (page) => {
    const at = page.path.slice(0, -TS.length)
    return [page.path, ...tails.map((one) => `${at}.${one}`)]
  }
}

const EVERY = stating(["code.ts", "test.ts", "uncommitted.ts"])

function over(
  parts: Standing["parts"],
  deep: readonly string[] = []
): (names: readonly string[]) => Standing {
  return folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    declaring: (at) => (at === ABOVE ? CODE_CHECK : null),
    parts,
    deep,
  })
}

const folder = over(EVERY)

test("pages of the type above sitting as flat files take the shape", () => {
  expect(pagesWithTheirFilesBesideThem(folder(["one.code-check.ts", "two.code-check.ts"]))).toEqual(
    []
  )
})

test("a page carrying a file its page states takes the shape", () => {
  const held = folder([
    "one.code-check.ts",
    "one.code-check.code.ts",
    "two.code-check.ts",
    "two.code-check.test.ts",
  ])
  expect(pagesWithTheirFilesBesideThem(held)).toEqual([])
})

test("a file kept outside the commit beside a page takes the shape too", () => {
  const held = folder(["one.code-check.ts", "one.code-check.uncommitted.ts"])
  expect(pagesWithTheirFilesBesideThem(held)).toEqual([])
})

test("a file beside a page that page states nowhere is refused, and the reason names it", () => {
  const held = over(stating(["code.ts"]))(["one.code-check.ts", "one.code-check.test.ts"])
  const said = pagesWithTheirFilesBesideThem(held)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("one.code-check.test.ts")
  expect(said[0]).toContain("states no such file")
})

test("a file beside no page in the folder is refused, and the reason names it", () => {
  const said = pagesWithTheirFilesBesideThem(
    folder(["one.code-check.ts", "two.code-check.code.ts"])
  )
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("two.code-check.code.ts")
})

test("a page of another page type is refused, and the reason names it", () => {
  const said = pagesWithTheirFilesBesideThem(folder(["one.code-check.ts", "two.model-check.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("not of `code-check`")
  expect(said[0]).toContain("two.model-check.ts")
})

test("a folder inside is refused, and the reason names it", () => {
  const held = over(EVERY, ["one/one.code-check.ts"])(["two.code-check.ts"])
  const said = pagesWithTheirFilesBesideThem(held)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("folders sit inside")
  expect(said[0]).toContain("one")
})

test("a file that is neither a page nor sits beside one is refused", () => {
  const said = pagesWithTheirFilesBesideThem(folder(["one.code-check.ts", "notes.txt"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("notes.txt")
  expect(said[0]).toContain("neither a page nor a file beside one")
})

test("a folder named pages above which no page type sits is refused", () => {
  const held = folderFrom({ folder: "akasha/schema/pages", pageTypes: PAGE_TYPES })
  expect(pagesWithTheirFilesBesideThem(held([]))).toEqual([
    "the folder above holds no page type of its own",
  ])
})

test("a folder holding no page is refused", () => {
  expect(pagesWithTheirFilesBesideThem(folder([]))).toEqual(["it holds no page"])
})
