import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type AssignmentSlug = string

export const assignmentSlug = {
  id: "01a05035-2609-72ee-98ad-8ba4505d3e41",
  pageTypeSlug: "text-property",
  slug: "assignment-slug",
  definition: "the domain or person whose work a seat answers to",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "stopgap",
      statement:
        "This holds text because no person stands as a page, and a seat is assigned to a domain or a person.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a domain or a person.",
    },
  ],
} as const satisfies TextProperty
