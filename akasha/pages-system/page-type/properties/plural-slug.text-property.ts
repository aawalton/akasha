import type { TextProperty } from "../../text-property/text-property.page-type.ts"

export type PluralSlug = string

export const pluralSlug = {
  id: "01a04fd9-50dd-74e4-86cd-6f72698418e2",
  pageTypeSlug: "text-property",
  slug: "plural-slug",
  definition: "the slug standing for many pages of a page type",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A plural is stated rather than worked out, because a plural cannot be read off a singular.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder holding many pages of one type is named for this, and so is the address those pages are reached by from outside.",
    },
  ],
} as const satisfies TextProperty
