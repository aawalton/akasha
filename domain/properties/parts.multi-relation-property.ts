import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const parts = {
  id: "01a0877e-e1fa-73c7-909f-f872c144f719",
  type: "page-type/multi-relation-property",
  slug: "parts",
  propertySlug: "parts",
  definition: "the domains making up this one",
  targetPageType: "page-type/domain",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's parent is this edge inverted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is named by exactly one parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parts list is in the order its parts were written in rather than in any other.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
