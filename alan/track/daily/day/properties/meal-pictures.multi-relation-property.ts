import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const mealPictures = {
  id: "01a0d3d9-dd42-7a6d-8dcd-e4095c0f9d61",
  type: "page-type/multi-relation-property",
  slug: "meal-pictures",
  propertySlug: "meals",
  definition: "the images of the meals Alan eats on a day",
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
  createdAt: "2026-09-24T14:37:45.666Z",
  updatedAt: "2026-10-30T16:43:36.713Z",
} as const satisfies MultiRelationProperty
