import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const person = {
  id: "01a05390-11db-7a03-ba9c-c7c30248aee3",
  type: "page-type/relation-property",
  slug: "person",
  propertySlug: "person",
  definition: "a page's person",
  targetPageType: "page-type/person",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The person a seat is of and the work a seat answers for are two facts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat assigned to a person states that person in two places.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
