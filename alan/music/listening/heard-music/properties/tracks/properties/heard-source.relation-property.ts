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
  createdAt: "2026-09-02T13:12:49.935Z",
  updatedAt: "2026-09-22T19:41:38.000Z",
} as const satisfies RelationProperty
