import { expect, test } from "bun:test"
import { folderFrom } from "../../folder-matches-a-shape.code-check.test-fixtures.ts"
import type { Declaring, Standing } from "../folder-shape.page-type.ts"
import { pageTypeWithItsParts } from "./page-type-with-its-parts.folder-shape.code.ts"

const FOLDER = "akasha/code-checks"

const PAGE_TYPES = new Set<string>(["page-type", "domain", "module", "code-check"])

function declared(slug: string, pluralSlug: string): Declaring {
  return { slug, pluralSlug, propertySlugs: new Set<string>() }
}

const DECLARING = new Map<string, Declaring>([
  [FOLDER, declared("code-check", "code-checks")],
  [`${FOLDER}/model-checks`, declared("model-check", "model-checks")],
  [`${FOLDER}/rules`, declared("rule", "rulings")],
])

function over(deep: readonly string[]): (names: readonly string[]) => Standing {
  return folderFrom({
    folder: FOLDER,
    pageTypes: PAGE_TYPES,
    declaring: (at) => DECLARING.get(at) ?? null,
    deep,
  })
}

const folder = over([])

test("one page type with the parts it is allowed takes the shape", () => {
  const held = over([
    "pages/one.code-check.ts",
    "properties/two.text-property.ts",
    "modules/m/m.module.ts",
  ])
  expect(pageTypeWithItsParts(held(["code-check.page-type.ts"]))).toEqual([])
})

test("a subfolder named for the plural slug of the page type inside it is a part", () => {
  const held = over(["model-checks/model-check.page-type.ts"])
  expect(pageTypeWithItsParts(held(["code-check.page-type.ts"]))).toEqual([])
})

test("a subfolder holding a domain page is a part", () => {
  const held = over(["naming/naming.domain.ts"])
  expect(pageTypeWithItsParts(held(["code-check.page-type.ts"]))).toEqual([])
})

test("a subfolder named other than that page type's plural slug is refused, and named", () => {
  const held = over(["rules/rule.page-type.ts"])
  const said = pageTypeWithItsParts(held(["code-check.page-type.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("rules")
})

test("a folder named other than the plural slug is refused, and the reason names both", () => {
  const held = folderFrom({
    folder: "akasha/code-check",
    pageTypes: PAGE_TYPES,
    declaring: () => declared("code-check", "code-checks"),
  })
  const said = pageTypeWithItsParts(held(["code-check.page-type.ts"]))
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("`code-check`")
  expect(said[0]).toContain("`code-checks`")
})

test("a folder holding no page type at all is refused", () => {
  const held = folderFrom({ folder: FOLDER, pageTypes: PAGE_TYPES })
  expect(pageTypeWithItsParts(held([]))).toEqual(["it holds no page type of its own"])
})

test("a page that is no page type is refused, and the reason names it", () => {
  const said = pageTypeWithItsParts(folder(["code-check.page-type.ts", "one.code-check.ts"]))
  expect(said.some((each) => each.includes("one.code-check.ts"))).toBe(true)
})

test("a file beside the page type is refused", () => {
  const said = pageTypeWithItsParts(
    folder(["code-check.page-type.ts", "code-check.page-type.code.ts"])
  )
  expect(said.some((each) => each.includes("code-check.page-type.code.ts"))).toBe(true)
})

test("a file that is neither a page nor sits beside one is refused", () => {
  const said = pageTypeWithItsParts(folder(["code-check.page-type.ts", "notes.txt"]))
  expect(said.some((each) => each.includes("notes.txt"))).toBe(true)
})
