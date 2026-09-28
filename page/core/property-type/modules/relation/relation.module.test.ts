import { expect, test } from "bun:test"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { RELATION_OPS } from "akasha/page/core/property-type/modules/relation/relation.module.code.ts"

const STORY = "tale/first-tale"

const OTHER = "tale/second-tale"

const DEFINED: PropertyDefinition = { id: "story", title: "Story", type: "relation" }

function passes(operator: string, value: readonly string[], held: string | null): boolean {
  return RELATION_OPS.getFilterPredicate({ operator, value }, DEFINED)(held)
}

test("a relation is among the pages a filter names where it names one of them", () => {
  expect(passes("includes", [STORY, OTHER], STORY)).toBe(true)
  expect(passes("includes", [OTHER], STORY)).toBe(false)
})

test("a relation naming nothing is among none of the pages a filter names", () => {
  expect(passes("includes", [STORY], null)).toBe(false)
  expect(passes("not_includes", [STORY], null)).toBe(true)
})

test("a relation is outside the pages a filter names where it names none of them", () => {
  expect(passes("not_includes", [OTHER], STORY)).toBe(true)
  expect(passes("not_includes", [STORY, OTHER], STORY)).toBe(false)
})
