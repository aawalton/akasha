import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const surplusHours = {
  id: "01a072ee-1b88-7b44-a2b4-9cb40106ef0e",
  type: "page-type/computed-property",
  slug: "surplus-hours",
  propertySlug: "surplus-hours",
  definition: "the hours of sleep a day keeps after the hours the day spends",
  holds: "number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day holding neither sleep nor spend states no surplus.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-05T18:56:42.376Z",
  updatedAt: "2026-10-30T16:43:10.492Z",
} as const satisfies ComputedProperty
