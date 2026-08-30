import type { TextProperty } from "../../text-property/text-property.page-type.ts"

export type Slug = string

export const slug = {
  id: "01a049b9-856c-7187-96e0-518b0a8c72cb",
  pageTypeSlug: "text-property",
  slug: "slug",
  propertySlug: "slug",
  definition: "the name a page is reached by",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  unique: "page-type",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A slug is unique among the pages of its page type.",
    },
    {
      invariantKind: "constraint",
      statement: "A slug that cannot become a page's export name is no slug.",
    },
  ],
} as const satisfies TextProperty
