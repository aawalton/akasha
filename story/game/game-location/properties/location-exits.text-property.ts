import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const locationExits = {
  id: "01a0c644-3a81-7877-8cff-40282ead975d",
  type: "page-type/text-property",
  slug: "location-exits",
  propertySlug: "exits",
  definition: "a way out of a place, and what it takes to use that way",
  maxLength: 300,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/gap",
      statement: "A way out names the place it reaches rather than describing it.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
