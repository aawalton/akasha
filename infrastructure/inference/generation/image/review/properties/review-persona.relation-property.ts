import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const reviewPersona = {
  id: "01a0deb3-ad9d-7053-9f9d-ec0756244ef9",
  type: "page-type/relation-property",
  slug: "review-persona",
  propertySlug: "persona",
  definition: "the persona whose images a review covers",
  targetPageType: "page-type/persona",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A review naming no persona covers the images of every persona and of none.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
