import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const spendHours = {
  id: "01a072ee-1b88-78a4-9ebc-c270a0a4e3fb",
  type: "page-type/computed-property",
  slug: "spend-hours",
  propertySlug: "spend-hours",
  definition: "what every stretch of the day cost, added up",
  holds: "number",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch still open counts up to the moment the reading is taken.",
    },
  ],
  types: "ts",
} as const satisfies ComputedProperty
