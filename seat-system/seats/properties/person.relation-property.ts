import type { Slug } from "@akasha/pages/page/slug"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type Person = Slug

export const person = {
  id: "01a05390-11db-7a03-ba9c-c7c30248aee3",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "person",
  propertySlug: "person",
  definition: "the person a page is of",
  targetPageType: "page-type/person",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The person a seat is of and the work a seat answers for are two facts.",
    },
    {
      invariantKind: "departure",
      statement: "A seat assigned to a person states that person in two places.",
    },
  ],
} as const satisfies RelationProperty
