import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const startLimitIntervalSeconds = {
  id: "01a06738-9f12-7438-a51b-8c1408e6e9b7",
  type: "page-type/number-property",
  slug: "start-limit-interval-seconds",
  propertySlug: "start-limit-interval-seconds",
  definition: "the window counting a unit's repeated starts",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit starting too often inside the window is left stopped.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
