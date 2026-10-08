import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const gymHolds = {
  id: "01a11b34-da16-78db-b571-78cb6bd21b9c",
  type: "page-type/multi-relation-property",
  slug: "gym-holds",
  propertySlug: "holds",
  definition: "the pieces of kit a gym has for Alan to load a movement with",
  targetPageType: "page-type/fitness-equipment",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece a gym holds loads a movement there only while that piece is available.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A gym holding every implement names no piece.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
