import type { TextProperty } from "@akasha/pages/text-property"

export type PartOf = string

export const partOf = {
  id: "01a06738-9f12-752f-bea5-7ff5466aeba0",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "part-of",
  propertySlug: "part-of",
  definition: "the unit this unit stops and restarts along with",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A unit stops when the unit named here stops.",
    },
  ],
} as const satisfies TextProperty
