import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const after = {
  id: "01a06738-9f12-7d3a-bae3-9a7bbcd5ba19",
  type: "page-type/text-property",
  slug: "after",
  propertySlug: "after",
  definition: "a unit this unit starts after",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A unit named here orders the start without being required to be there.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
