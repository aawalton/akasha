import { afterAll, expect, test } from "bun:test"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { ownerFor } from "akasha/page/service/modules/page-shaping/page-shaping.module.code.ts"
import {
  climbedInRepo,
  climbedInTypes,
  declaredAt,
} from "akasha/page/service/modules/page-shaping/page-shaping.module.test-fixtures.ts"

afterAll(scratch.sweep)

test("a page type naming one above it reads the owner that climb carries", () => {
  expect(ownerFor(climbedInRepo, "temper-catalog-thing")).toBe("account-page")
  expect(ownerFor(climbedInRepo, "decision-kind")).toBeNull()
})

test("the owner is read from the second page type above where the first states none", () => {
  expect(ownerFor(climbedInTypes, "stated")).toBe("account-page")
})

test("the owner is taken from the nearer of the page types above", () => {
  expect(ownerFor(climbedInTypes, "nearer")).toBe("apart-owner")
})

test("where two page types above are equally near, the owner is the last one named", () => {
  expect(ownerFor(climbedInTypes, "tied")).toBe("second-owner")
})

test("a page type above that nothing holds stops no other climb", () => {
  expect(ownerFor(climbedInTypes, "missing")).toBe("there-owner")
})

test("a declaration is titled by its own property slug rather than by the definition", () => {
  expect(declaredAt("decision-kind", "decision-group")?.title).toBe("Decision Group")
})

test("a property holding named fields declares each of those fields", () => {
  const found = declaredAt("domain", "decisions")

  expect(found?.fields.map((one) => one.key)).toEqual(["decision-kind", "statement"])
})

test("a field is drawn the way the property that field names is drawn", () => {
  const found = declaredAt("domain", "decisions")

  expect(found?.fields[0]?.drawnBy).toContain("relation-property")
})

test("a field naming a page type is declared with that page type as its target", () => {
  const found = declaredAt("domain", "decisions")

  expect(found?.fields[0]?.targetSlug).toBe("decision-kind")
})

test("a field of a field is declared as nothing", () => {
  const found = declaredAt("domain", "decisions")

  expect(found?.fields.every((one) => one.fields.length === 0)).toBe(true)
})

test("a property holding no named fields declares no field", () => {
  expect(declaredAt("decision-kind", "slug")?.fields).toEqual([])
})
