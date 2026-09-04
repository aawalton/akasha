import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type HeaderFields = string

export const headerFields = {
  id: "01a0683a-620a-7905-b43d-ad803b4fae71",
  pageTypeSlug: "text-property",
  slug: "header-fields",
  propertySlug: "fields",
  definition: "the keys of the properties standing above the pages a page gathers",
  max: 64,
  nameFormatSlug: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A header naming keys states them in the order they stand in.",
    },
  ],
} as const satisfies TextProperty
