import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type AssignmentSlug = string

export const assignmentSlug = {
  id: "01a053a2-d0e7-7948-a966-74efed3c62f0",
  pageTypeSlug: "text-property",
  slug: "assignment-slug",
  propertySlug: "assignment-slug",
  definition: "the domain whose work a seat answers to",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A person and a persona each extend a domain.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "Five of the domains the seats standing today name have not moved into the new system.",
    },
    {
      invariantKind: "stopgap",
      statement: "This is named for the assignment.",
    },
    {
      invariantKind: "stopgap",
      statement: "A second property page cannot yet carry the slug `domain-slug`.",
    },
    {
      invariantKind: "gap",
      statement: "This is reached as `domain-slug`.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a domain.",
    },
  ],
} as const satisfies TextProperty
