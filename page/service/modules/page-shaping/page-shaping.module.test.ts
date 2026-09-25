import { afterAll, expect, test } from "bun:test"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { scratch } from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import {
  ownerFor,
  shaping,
  shapingEvery,
  titleColorFor,
} from "akasha/page/service/modules/page-shaping/page-shaping.module.code.ts"
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

test("a page type names the property its own page says colors its titles", () => {
  expect(titleColorFor(climbedInTypes, "stated-two")).toBe("computed-property/tint")
})

test("a page type naming none takes the one the page type above it names", () => {
  expect(titleColorFor(climbedInTypes, "stated")).toBe("computed-property/tint")
})

test("a page type's own title color wins over the one above it", () => {
  expect(titleColorFor(climbedInTypes, "recolored")).toBe("computed-property/hue")
})

test("a page type nothing above names a title color for has none", () => {
  expect(titleColorFor(climbedInTypes, "tied")).toBeNull()
})

test("a declaration has the icon its property's own page type names", () => {
  expect(declaredAt("domain", "decisions")?.icon).toBe("braces")
})

test("a declaration whose page type names no icon has the one the type above it names", () => {
  expect(declaredAt("decision-kind", "slug")?.icon).toBe("text-align-start")
})

test("a declaration colors a title only where its page type names it", () => {
  expect(declaredAt("domain", "decisions")?.colorsTitle).toBe(false)
})

test("page types shaped together are shaped as each is shaped alone", () => {
  const root = rootOf(import.meta.dir)
  const slugs = ["domain", "decision-kind", "no-such-page-type"]
  const together = shapingEvery(root, slugs)
  if ("refused" in together) throw new Error(together.refused)
  for (const slug of slugs) {
    const alone = shaping(root, slug)
    if ("refused" in alone) throw new Error(alone.refused)
    expect(together.shapes[slug]).toEqual(alone.shape)
  }
  expect(together.shapes["no-such-page-type"]).toBeNull()
})
