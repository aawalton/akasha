import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export const fitnessEquipmentCovers = {
  id: "01a09338-8296-7d00-8ec3-c16e1350135b",
  type: "relation-property",
  slug: "fitness-equipment-covers",
  propertySlug: "covers",
  definition: "the kit a movement names that this piece answers for",
  targetPageType: "page-type/strength-exercise-implement",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A piece answering for no kit a movement names covers nothing.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
