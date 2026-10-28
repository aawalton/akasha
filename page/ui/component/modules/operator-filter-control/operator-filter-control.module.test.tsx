import "akasha/check/test/modules/dom-registering/dom-registering.module.code.ts"
import { expect, test } from "bun:test"
import { render } from "@testing-library/react"
import type { PageFilterDimension } from "akasha/page/core/view/modules/generate-filter-dimensions/generate-filter-dimensions.module.code.ts"
import { OperatorFilterControl } from "akasha/page/ui/component/modules/operator-filter-control/operator-filter-control.module.code.tsx"

const PROGRESSED_AT: PageFilterDimension = {
  id: "progressedAt",
  label: "Progressed At",
  type: "instant",
  operators: [
    { value: "is_relative_to_today", label: "Is relative to today" },
    { value: "lt_or_empty", label: "Is before or empty" },
  ],
}

const COMPLETION: PageFilterDimension = {
  id: "completion",
  label: "Completion",
  type: "text",
  options: [
    { id: "completed", label: "Completed" },
    { id: "in-progress", label: "In Progress" },
  ],
  operators: [
    { value: "includes", label: "Is any of" },
    { value: "not_includes", label: "Is none of" },
  ],
}

test("text held to a closed set is drawn with the values a filter leaves out", () => {
  const drawn = render(
    <OperatorFilterControl
      dimension={COMPLETION}
      filter={{ propertyId: "completion", operator: "not_includes", value: ["completed"] }}
      onFilterChange={() => undefined}
    />
  )
  expect(drawn.container.textContent).toContain("Is none of")
  expect(drawn.container.textContent).toContain("Completed")
  drawn.unmount()
})

test("a filter before a day or empty is drawn as that test and that day", () => {
  const drawn = render(
    <OperatorFilterControl
      dimension={PROGRESSED_AT}
      filter={{ propertyId: "progressedAt", operator: "lt_or_empty", value: { sentinel: "today" } }}
      onFilterChange={() => undefined}
    />
  )
  expect(drawn.container.textContent).toContain("Is before or empty")
  expect(drawn.container.textContent).toContain("Today")
  drawn.unmount()
})
