import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const partOf = {
  id: "01a06738-9f12-752f-bea5-7ff5466aeba0",
  type: "page-type/text-property",
  slug: "part-of",
  propertySlug: "part-of",
  definition: "the unit this unit follows in stopping and restarting",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit stops when the unit named here stops.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
