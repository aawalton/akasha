import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type PersonSlug = string

export const personSlug = {
  id: "01a05390-11db-7a03-ba9c-c7c30248aee3",
  pageTypeSlug: "text-property",
  slug: "person-slug",
  propertySlug: "person-slug",
  definition: "the person whose seat this is",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Whose seat this is and what work it answers for are two facts, and a seat assigned to a person states that person twice.",
    },
    {
      invariantKind: "stopgap",
      statement: "This holds text because no person stands as a page.",
    },
    {
      invariantKind: "gap",
      statement: "This is a relation to a person.",
    },
  ],
} as const satisfies TextProperty
