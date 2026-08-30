import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type PersonSlug = Slug

export const personSlug = {
  id: "01a05390-11db-7a03-ba9c-c7c30248aee3",
  pageTypeSlug: "relation-property",
  slug: "person-slug",
  propertySlug: "person-slug",
  definition: "the person whose seat this is",
  targetPageTypeSlug: "page-type/person",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Whose seat this is and what work it answers for are two facts.",
    },
    {
      invariantKind: "departure",
      statement: "A seat assigned to a person states that person twice.",
    },
  ],
} as const satisfies RelationProperty
