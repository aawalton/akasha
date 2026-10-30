import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const gymHolds = {
  id: "01a11b34-da16-78db-b571-78cb6bd21b9c",
  type: "page-type/multi-relation-property",
  slug: "gym-holds",
  propertySlug: "holds",
  definition: "the pieces of fitness equipment a gym holds",
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
  createdAt: "2026-10-08T11:10:10.966Z",
  updatedAt: "2026-10-30T16:52:35.844Z",
} as const satisfies MultiRelationProperty
