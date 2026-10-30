import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const fitnessEquipmentCovers = {
  id: "01a09338-8296-7d00-8ec3-c16e1350135b",
  type: "page-type/multi-relation-property",
  slug: "fitness-equipment-covers",
  propertySlug: "covers",
  definition: "the strength exercise implements this piece of fitness equipment can replace",
  targetPageType: "page-type/strength-exercise-implement",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece answering for no kit a movement names covers nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-12T01:25:49.334Z",
  updatedAt: "2026-10-30T16:48:02.106Z",
} as const satisfies MultiRelationProperty
