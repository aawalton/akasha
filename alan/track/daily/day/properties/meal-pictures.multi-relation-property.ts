import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const mealPictures = {
  id: "01a0d3d9-dd42-7a6d-8dcd-e4095c0f9d61",
  type: "page-type/multi-relation-property",
  slug: "meal-pictures",
  propertySlug: "meals",
  definition: "the pictures taken of a day's meals",
  targetPageType: "page-type/image",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A meal named here is the picture taken of that meal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture whose bytes are gone is no longer named.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
