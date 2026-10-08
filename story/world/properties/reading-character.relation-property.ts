import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const readingCharacter = {
  id: "01a0d3cb-ae43-75ef-bbd5-cfe20827da69",
  type: "page-type/relation-property",
  slug: "reading-character",
  propertySlug: "character",
  definition: "the character a reading reaches",
  targetPageType: "page-type/world-character",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reading names its character only where the reading's kind is `character`.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-24T14:22:16.131Z",
  updatedAt: "2026-09-24T14:23:16.000Z",
} as const satisfies RelationProperty
