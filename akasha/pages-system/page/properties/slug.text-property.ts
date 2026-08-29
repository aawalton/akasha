import type { TextProperty } from "../../page-property/text-property.page-type.ts"

export type Slug = string

export const slug = {
  id: "01a049b9-856c-7187-96e0-518b0a8c72cb",
  pageTypeSlug: "text-property",
  slug: "slug",
  definition: "the name a page is reached by",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug is unique among the pages of its page type.",
    },
  ],
} as const satisfies TextProperty
