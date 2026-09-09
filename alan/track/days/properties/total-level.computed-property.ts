import type { ComputedProperty } from "@akasha/pages/computed-property"

export type TotalLevel = number

export const totalLevel = {
  id: "01a0721c-f58c-7290-8d4c-25779a5549a0",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "total-level",
  propertySlug: "total-level",
  definition: "which of the four rungs the day's six values reached between them",
  holds: "number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day missing any of the six levels reaches no rung.",
    },
  ],
} as const satisfies ComputedProperty
