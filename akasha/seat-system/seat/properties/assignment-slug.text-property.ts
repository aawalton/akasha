import type { TextProperty } from "@akasha/pages-system/text-property"

export type AssignmentSlug = string

export const assignmentSlug = {
  id: "01a053a2-d0e7-7948-a966-74efed3c62f0",
  pageTypeSlug: "text-property",
  slug: "assignment-slug",
  propertySlug: "assignment-slug",
  definition: "the domain or initiative whose work a seat answers to",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "An assignment stated under no page type names a domain.",
    },
    {
      invariantKind: "departure",
      statement: "A person and a persona each extend a domain.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "Three of the domains the seats standing today name have not moved into the new system.",
    },
  ],
} as const satisfies TextProperty
