import type { ComputedProperty } from "@akasha/pages/computed-property"

export type Stoplights = string

export const stoplights = {
  id: "01a07224-bf20-74dd-b1bc-270ef3cf98c8",
  pageTypeSlug: "computed-property",
  type: "computed-property",
  slug: "stoplights",
  propertySlug: "stoplights",
  definition: "the rung each of the day's six values reached, as one colored light apiece",
  holds: "text",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day missing any of the six lights states no lights.",
    },
  ],
} as const satisfies ComputedProperty
