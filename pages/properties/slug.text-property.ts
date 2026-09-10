import type { TextProperty } from "../text-properties/text-property.page-type.types.ts"

export type Slug = string

export const slug = {
  id: "01a049b9-856c-7187-96e0-518b0a8c72cb",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "slug",
  propertySlug: "slug",
  definition: "the name a page is reached by",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  unique: "page-type",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A slug that cannot become a page's export name is no slug.",
    },
  ],
} as const satisfies TextProperty
