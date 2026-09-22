import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const relationshipLevel = {
  id: "01a0655b-4a9b-7002-96a4-5f01bb918e88",
  type: "page-type/relation-property",
  slug: "relationship-level",
  propertySlug: "relationship-level",
  definition: "a record's rung on the closeness ladder",
  targetPageType: "page-type/closeness-level",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung's own page says what the rung is, so nothing here repeats it.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
