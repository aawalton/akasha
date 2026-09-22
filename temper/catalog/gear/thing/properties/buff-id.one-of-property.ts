import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const buffId = {
  id: "01a05fcc-41f1-7e7a-abd6-c8c6650999ad",
  type: "page-type/one-of-property",
  slug: "buff-id",
  propertySlug: "buff-id",
  definition: "the helpful effect a thing puts on whoever uses it",
  members: [
    "relation-property/major-buff",
    "relation-property/minor-buff",
    "relation-property/other-buff",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A buff is a page of the grade the game gives that buff.",
    },
  ],
  types: "ts",
} as const satisfies OneOfProperty
