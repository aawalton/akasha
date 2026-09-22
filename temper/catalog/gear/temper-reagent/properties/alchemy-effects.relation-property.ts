import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const alchemyEffects = {
  id: "01a05fd1-d435-7be6-b06d-cee7752f59c6",
  type: "page-type/relation-property",
  slug: "alchemy-effects",
  propertySlug: "alchemy-effects",
  definition: "the four effects a reagent can lend what it is brewed into",
  targetPageType: "page-type/temper-poison-effect",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One list has every effect a reagent carries.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
