import type { ComputedProperty } from "akasha/pages/computed-properties/computed-property.page-type.types.ts"

export type SurplusHours = number

export const surplusHours = {
  id: "01a072ee-1b88-7b44-a2b4-9cb40106ef0e",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "surplus-hours",
  propertySlug: "surplus-hours",
  definition: "how much of the night's sleep the day has not spent",
  holds: "number",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day holding neither sleep nor spend states no surplus.",
    },
  ],
} as const satisfies ComputedProperty
