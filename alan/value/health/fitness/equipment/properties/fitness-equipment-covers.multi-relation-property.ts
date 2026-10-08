import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const fitnessEquipmentCovers = {
  id: "01a09338-8296-7d00-8ec3-c16e1350135b",
  type: "page-type/multi-relation-property",
  slug: "fitness-equipment-covers",
  propertySlug: "covers",
  definition: "the kit a movement names and this piece replaces",
  targetPageType: "page-type/strength-exercise-implement",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece answering for no kit a movement names covers nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-12T01:25:49.334Z",
  updatedAt: "2026-09-22T14:00:25.000Z",
} as const satisfies MultiRelationProperty
