import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const alliance = {
  id: "01a0cb4e-2ed1-7e8e-a8c9-ff9076977804",
  type: "page-type/relation-property",
  slug: "alliance",
  propertySlug: "alliance",
  definition: "the alliance a companion belongs to",
  targetPageType: "page-type/temper-alliance",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A companion belonging to no alliance names the no-alliance page rather than nothing.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
