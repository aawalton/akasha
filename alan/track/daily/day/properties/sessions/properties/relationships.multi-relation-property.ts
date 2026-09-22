import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const relationships = {
  id: "01a05fd8-c30f-754a-bb2e-de6ec74d6e4a",
  type: "page-type/multi-relation-property",
  slug: "relationships",
  propertySlug: "relationships",
  definition: "the people sharing a stretch of time",
  targetPageType: "page-type/relationship",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A person here is the relationship Alan has with them rather than a person page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stretch names each relationship by its id rather than by its address.",
    },
  ],
  types: "ts",
} as const satisfies MultiRelationProperty
