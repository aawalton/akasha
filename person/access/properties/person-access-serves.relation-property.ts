import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const personAccessServes = {
  id: "01a05430-c0ef-7fbe-8836-045d9e351ad7",
  type: "page-type/relation-property",
  slug: "person-access-serves",
  propertySlug: "serves",
  definition: "the shared page type the target represents",
  targetPageType: "page-type/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A target serves a page type only where that target is a person's own copy of that page type.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
