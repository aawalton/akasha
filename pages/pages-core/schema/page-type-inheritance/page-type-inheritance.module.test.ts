import { expect, test } from "bun:test"
import {
  type PageTypeForInheritance,
  resolveDescendantPageTypeIds,
} from "./page-type-inheritance.module.code.ts"

function typed(id: string, slug: string, above: readonly string[] | null): PageTypeForInheritance {
  return { _id: id, properties: { slug, extendsSlug: above } }
}

test("a page type descends from the one it names as the page type it extends", () => {
  const types = [typed("1", "page", null), typed("2", ["domain", "page-type/page"])]

  expect([...resolveDescendantPageTypeIds(types, "1")].sort()).toEqual(["1", "2"])
})

test("a parent named by slug alone is read as one named with its page type is", () => {
  const types = [typed("1", "page", null), typed("2", ["domain", "page"])]

  expect([...resolveDescendantPageTypeIds(types, "1")].sort()).toEqual(["1", "2"])
})

test("a page type naming two parents descends from each of them", () => {
  const types = [
    typed("1", "module", ["page-type/domain"]),
    typed("2", "page-property", ["page-type/page"]),
    typed("3", "computed-property", ["page-type/module", "page-type/page-property"]),
  ]

  expect([...resolveDescendantPageTypeIds(types, "1")].sort()).toEqual(["1", "3"])
  expect([...resolveDescendantPageTypeIds(types, "2")].sort()).toEqual(["2", "3"])
})

test("the parent a page type reaches nothing through is left out of the answer", () => {
  const types = [
    typed("1", "target", null),
    typed("2", "apart", null),
    typed("3", "both", ["page-type/apart", "page-type/target"]),
  ]

  const found = resolveDescendantPageTypeIds(types, "1")

  expect(found.has("3")).toBe(true)
  expect(found.has("2")).toBe(false)
})

test("a ring among page types is answered rather than followed round", () => {
  const types = [
    typed("1", "target", null),
    typed("2", "a", ["page-type/b"]),
    typed("3", "b", ["page-type/a"]),
  ]

  expect([...resolveDescendantPageTypeIds(types, "1")]).toEqual(["1"])
})

test("a page type naming a parent no page type here holds descends from nothing", () => {
  const types = [typed("1", "target", null), typed("2", ["orphan", "page-type/gone"])]

  expect([...resolveDescendantPageTypeIds(types, "1")]).toEqual(["1"])
})
