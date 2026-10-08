import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const readingMechanic = {
  id: "01a063ce-6216-7007-b529-a31661f9223d",
  type: "page-type/relation-property",
  slug: "reading-mechanic",
  propertySlug: "mechanic",
  definition: "the mechanic a reading reaches",
  targetPageType: "page-type/world-mechanic",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name two kinds of mechanic carry names the kind it reaches as well.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T20:27:45.046Z",
  updatedAt: "2026-09-22T18:51:19.000Z",
} as const satisfies RelationProperty
