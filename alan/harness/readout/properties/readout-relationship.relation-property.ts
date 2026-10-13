import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const readoutRelationship = {
  id: "01a13588-20c0-7d03-8a72-61141df570cd",
  type: "page-type/relation-property",
  slug: "readout-relationship",
  propertySlug: "relationship",
  definition: "the relationship whose stretches a reading counts",
  targetPageType: "page-type/relationship",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout counting the hours with one person names that person's relationship.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout counting anything else names no relationship.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-13T13:51:16.159Z",
  updatedAt: "2026-10-13T13:51:16.159Z",
} as const satisfies RelationProperty
