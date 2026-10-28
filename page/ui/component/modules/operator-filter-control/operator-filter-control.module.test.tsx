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
