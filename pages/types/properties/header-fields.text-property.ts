import type { TextProperty } from "../../text-properties/text-property.page-type.types.ts"

export type HeaderFields = string

export const headerFields = {
  id: "01a0683a-620a-7905-b43d-ad803b4fae71",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "header-fields",
  propertySlug: "fields",
  definition: "the keys of the properties standing above the pages a page gathers",
  maxLength: 64,
  nameFormat: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A header naming keys states those keys in the order those keys stand in.",
    },
  ],
} as const satisfies TextProperty
