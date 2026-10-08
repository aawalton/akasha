import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const generator = {
  id: "01a04f17-5b7b-7835-87db-af7b36e912b5",
  type: "page-type/relation-property",
  slug: "generator",
  propertySlug: "generator",
  definition: "how this property's value is worked out when its page is created",
  targetPageType: "page-type/generator-kind",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A property stating no `generator` is written by hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page being created that states the property keeps the value the page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body carried from another path is left as the body stands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move is one page arriving somewhere else rather than a second page.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-29T19:55:25.947Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies RelationProperty
