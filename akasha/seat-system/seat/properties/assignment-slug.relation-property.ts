import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type AssignmentSlug = Slug

export const assignmentSlug = {
  id: "01a05035-2609-72ee-98ad-8ba4505d3e41",
  pageTypeSlug: "relation-property",
  slug: "assignment-slug",
  definition: "the domain whose work a seat answers to",
  targetPageTypeSlug: "page-type/domain",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A seat's assignment is sometimes a person and sometimes a bounded area of concern.",
    },
  ],
} as const satisfies RelationProperty
