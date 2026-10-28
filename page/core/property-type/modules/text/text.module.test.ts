import { expect, test } from "bun:test"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { TEXT_OPS } from "akasha/page/core/property-type/modules/text/text.module.code.ts"

const COMPLETION: PropertyDefinition = {
  id: "completion",
  title: "Completion",
  type: "text",
  config: {
    options: [
      { id: "completed", label: "Completed" },
      { id: "in-progress", label: "In Progress" },
    ],
  },
}

const AUTHOR: PropertyDefinition = { id: "author", title: "Author", type: "text" }

function passes(operator: string, value: readonly string[], held: string): boolean {
  return TEXT_OPS.getFilterPredicate({ operator, value }, COMPLETION)(held)
}

test("text held to a closed set of values is filtered as one of them or none of them", () => {
  const operators = TEXT_OPS.getFilterOperators(COMPLETION).map((one) => one.value)
  expect(operators).toContain("includes")
  expect(operators).toContain("not_includes")
})

test("open text is not filtered as one of a set", () => {
  const operators = TEXT_OPS.getFilterOperators(AUTHOR).map((one) => one.value)
  expect(operators).not.toContain("not_includes")
})

test("text is none of the values a filter names where it is not among them", () => {
  expect(passes("not_includes", ["completed"], "completed")).toBe(false)
  expect(passes("not_includes", ["completed"], "in-progress")).toBe(true)
  expect(passes("includes", ["completed"], "completed")).toBe(true)
})
