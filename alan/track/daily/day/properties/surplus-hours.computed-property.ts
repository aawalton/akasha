import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const surplusHours = {
  id: "01a072ee-1b88-7b44-a2b4-9cb40106ef0e",
  type: "page-type/computed-property",
  slug: "surplus-hours",
  propertySlug: "surplus-hours",
  definition: "how much of the night's sleep the day has not spent",
  holds: "number",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A day holding neither sleep nor spend states no surplus.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
