import type { Slug } from "@akasha/pages-system/page/slug"
import type { RelationProperty } from "@akasha/pages-system/relation-property"

export type PersonSlug = Slug

export const personSlug = {
  id: "01a05390-11db-7a03-ba9c-c7c30248aee3",
  pageTypeSlug: "relation-property",
  slug: "person-slug",
  propertySlug: "person-slug",
  definition: "the person a page is of",
  targetPageTypeSlug: "page-type/person",
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
