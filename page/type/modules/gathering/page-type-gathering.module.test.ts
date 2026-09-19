import { afterAll, expect, test } from "bun:test"
import { module } from "akasha/code/module/module.page-type.ts"
import {
  bodyOf,
  idOf,
  indexedRepo,
  scratch,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import {
  typeSlugsIn,
  typesAmong,
  typeValuesIn,
} from "akasha/page/type/modules/gathering/page-type-gathering.module.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

afterAll(scratch.sweep)

const KIND_TYPE = "akasha/held-kind.page-type.ts"

const ONE_KIND = "akasha/held-kinds/one.held-kind.ts"

const PAGE_TYPE_AT = `${pageType.slug}/${pageType.slug}` as const

const MODULE_AT = `${pageType.slug}/${module.slug}` as const

function repoIn(): string {
  return indexedRepo({
    [KIND_TYPE]: bodyOf({
      id: idOf("e"),
      pageTypeSlug: "page-type",
      slug: "held-kind",
      pluralSlug: "held-kinds",
      extends: [PAGE_TYPE_AT],
    }),
    [ONE_KIND]: bodyOf({
      id: idOf("f"),
      pageTypeSlug: "held-kind",
      slug: "one",
      pluralSlug: "ones",
      extends: [MODULE_AT],
    }),
  })
}

test("a type reaching `page-type` by extending stands among the types gathered", () => {
  expect([...typeSlugsIn(repoIn())]).toContain("held-kind")
})

test("a type reaching no such type stands outside the types gathered", () => {
  expect([...typeSlugsIn(repoIn())]).not.toContain("module")
})

test("the pages of a type that was gathered are read as page types", () => {
  const root = repoIn()
  const held = typeValuesIn(root, typeSlugsIn(root)).map((one) => one[`slug`])

  expect(held).toContain("one")
})

test("a value stands as a page type where the type it is was named", () => {
  const value = { id: "a", pageTypeSlug: "held-kind", slug: "one" }

  expect([...typesAmong([value], new Set(["held-kind"])).keys()]).toEqual(["one"])
})

test("a caller naming no types reads `page-type` alone", () => {
  const value = { id: "a", pageTypeSlug: "held-kind", slug: "one" }

  expect([...typesAmong([value]).keys()]).toEqual([])
})
