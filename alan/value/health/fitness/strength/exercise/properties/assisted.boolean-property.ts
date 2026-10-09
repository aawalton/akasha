import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const assisted = {
  id: "01a12088-b89a-7a47-a95d-60a3718d3a2c",
  type: "page-type/boolean-property",
  slug: "assisted",
  propertySlug: "assisted",
  definition:
    "whether the weight a set of the movement states is assistance taken off the lifter's bodyweight",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An assisted set moves the share of bodyweight the movement carries less its weight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement stating nothing here is not assisted.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-09T11:59:53.497Z",
  updatedAt: "2026-10-09T11:59:53.497Z",
} as const satisfies BooleanProperty
