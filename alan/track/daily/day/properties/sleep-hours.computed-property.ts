import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const sleepHours = {
  id: "01a072ee-1b88-7477-8c90-7b5dc8e4d472",
  type: "page-type/computed-property",
  slug: "sleep-hours",
  propertySlug: "sleep-hours",
  definition: "the hours Alan slept, added up from the day's own stretches",
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
