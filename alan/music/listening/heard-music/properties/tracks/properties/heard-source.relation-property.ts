import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const heardSource = {
  id: "01a06240-340f-700e-a486-9e430bc408b2",
  type: "page-type/relation-property",
  slug: "heard-source",
  propertySlug: "heard-source",
  definition: "where a heard track was learned",
  targetPageType: "page-type/heard-source",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A track caught playing and a track seeded in are told apart here.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
