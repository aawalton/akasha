import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type LengthPropertyId = string

export const lengthPropertyId = {
  id: "01a0683a-620a-7c9f-8c62-ed7e2e10a9ca",
  pageTypeSlug: "text-property",
  slug: "length-property-id",
  propertySlug: "length-property-id",
  definition: "the key of the property holding how long a page is",
  max: 64,
  nameFormatSlug: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page whose length is not known is never recorded as read at its end.",
    },
  ],
} as const satisfies TextProperty
