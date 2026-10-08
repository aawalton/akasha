import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const characters = {
  id: "01a0de40-70c2-72d8-976d-f94658f84984",
  type: "page-type/multi-relation-property",
  slug: "characters",
  propertySlug: "characters",
  definition: "the characters a page is about",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relationship names every character it is between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A played turn names every character present in it.",
    },
  ],
  targetPageType: "page-type/world-character",
  types: "ts",
  createdAt: "2026-09-26T15:06:00.258Z",
  updatedAt: "2026-09-26T17:44:02.000Z",
} as const satisfies MultiRelationProperty
