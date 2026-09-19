import { expect, test } from "bun:test"
import { module } from "akasha/code/module/module.page-type.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import {
  type PageTypeForInheritance,
  resolveDescendantPageTypeIds,
} from "akasha/page/core/schema/modules/page-type-inheritance/page-type-inheritance.module.code.ts"
import { page } from "akasha/page/page.page-type.ts"
import { pageProperty } from "akasha/page/type/page-property/page-property.page-type.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const MODULE_AT = `${pageType.slug}/${module.slug}` as const

const PAGE_AT = `${pageType.slug}/${page.slug}` as const

const PAGE_PROPERTY_AT = `${pageType.slug}/${pageProperty.slug}` as const

function typed(id: string, slug: string, above: readonly string[]): PageTypeForInheritance {
  return { _id: id, properties: { slug, extendsSlug: above } }
}

test("a page type descends from the one it names as the page type it extends", () => {
  const types = [typed("1", "page", []), typed("2", "domain", [PAGE_AT])]

  expect([...resolveDescendantPageTypeIds(types, "1")].sort()).toEqual(["1", "2"])
})

test("a parent named by slug alone is read as one named with its page type is", () => {
  const types = [typed("1", "page", []), typed("2", "domain", ["page"])]

  expect([...resolveDescendantPageTypeIds(types, "1")].sort()).toEqual(["1", "2"])
})

test("a page type naming two parents descends from each of them", () => {
  const types = [
    typed("1", "module", [DOMAIN_AT]),
    typed("2", "page-property", [PAGE_AT]),
    typed("3", "computed-property", [MODULE_AT, PAGE_PROPERTY_AT]),
  ]

  expect([...resolveDescendantPageTypeIds(types, "1")].sort()).toEqual(["1", "3"])
  expect([...resolveDescendantPageTypeIds(types, "2")].sort()).toEqual(["2", "3"])
})

test("the parent a page type reaches nothing through is left out of the answer", () => {
  const types = [
    typed("1", "target", []),
    typed("2", "apart", []),
    typed("3", "both", ["page-type/apart", "page-type/target"]),
  ]

  const found = resolveDescendantPageTypeIds(types, "1")

  expect(found.has("3")).toBe(true)
  expect(found.has("2")).toBe(false)
})

test("a ring among page types is answered rather than followed round", () => {
  const types = [
    typed("1", "target", []),
    typed("2", "a", ["page-type/b"]),
    typed("3", "b", ["page-type/a"]),
  ]

  expect([...resolveDescendantPageTypeIds(types, "1")]).toEqual(["1"])
})

test("a page type naming a parent no page type here holds descends from nothing", () => {
  const types = [typed("1", "target", []), typed("2", "orphan", ["page-type/gone"])]

  expect([...resolveDescendantPageTypeIds(types, "1")]).toEqual(["1"])
})
