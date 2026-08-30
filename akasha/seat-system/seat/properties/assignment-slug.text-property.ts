import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type AssignmentSlug = string

export const assignmentSlug = {
  id: "01a05035-2609-72ee-98ad-8ba4505d3e41",
  pageTypeSlug: "text-property",
  slug: "assignment-slug",
  definition: "the domain whose work a seat answers to",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A seat's assignment is sometimes a person and sometimes a bounded area of concern.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "This holds text because the domains seats are assigned to have not all moved into the new system.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a domain.",
    },
  ],
} as const satisfies TextProperty
