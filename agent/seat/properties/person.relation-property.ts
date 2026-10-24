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
      decisionKind: "decision-kind/absence",
      statement: "No seat states this property, since a seat states its persons.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-30T16:45:45.819Z",
  updatedAt: "2026-10-24T17:50:28.120Z",
} as const satisfies RelationProperty
