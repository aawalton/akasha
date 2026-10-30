import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const spendHours = {
  id: "01a072ee-1b88-78a4-9ebc-c270a0a4e3fb",
  type: "page-type/computed-property",
  slug: "spend-hours",
  propertySlug: "spend-hours",
  definition: "the hours a day spends",
  holds: "number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch still open counts up to the moment the reading is taken.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-05T18:56:42.376Z",
  updatedAt: "2026-10-30T16:41:11.283Z",
} as const satisfies ComputedProperty
