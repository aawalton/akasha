import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const relationships = {
  id: "01a05fd8-c30f-754a-bb2e-de6ec74d6e4a",
  type: "page-type/multi-relation-property",
  slug: "relationships",
  propertySlug: "relationships",
  definition: "the people with Alan in a tracked session",
  targetPageType: "page-type/relationship",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person here is the relationship Alan has with them rather than a person page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracked session names each relationship by its id rather than by its address.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T02:00:36.367Z",
  updatedAt: "2026-10-30T17:48:38.864Z",
} as const satisfies MultiRelationProperty
