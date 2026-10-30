import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const sleepHours = {
  id: "01a072ee-1b88-7477-8c90-7b5dc8e4d472",
  type: "page-type/computed-property",
  slug: "sleep-hours",
  propertySlug: "sleep-hours",
  definition: "the hours of sleep in a day's tracked sessions",
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
  updatedAt: "2026-10-30T16:40:43.055Z",
} as const satisfies ComputedProperty
