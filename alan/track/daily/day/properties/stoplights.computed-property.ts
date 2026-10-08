import type { ComputedProperty } from "akasha/page/computed-property/computed-property.page-type.types.ts"

export const stoplights = {
  id: "01a07224-bf20-74dd-b1bc-270ef3cf98c8",
  type: "page-type/computed-property",
  slug: "stoplights",
  propertySlug: "stoplights",
  definition: "the rung each of the day's six values reached, as one colored light apiece",
  holds: "text",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day missing any of the six lights states no lights.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-05T15:16:45.984Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies ComputedProperty
