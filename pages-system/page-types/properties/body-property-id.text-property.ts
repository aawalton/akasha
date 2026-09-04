import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type BodyPropertyId = string

export const bodyPropertyId = {
  id: "01a0683a-620a-7bd1-9f9f-26882ff5531b",
  pageTypeSlug: "text-property",
  slug: "body-property-id",
  propertySlug: "body-property-id",
  definition: "the key of the property a page's body is read from",
  max: 64,
  nameFormatSlug: "name-format/lower-camel-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key named here that the page type carries no property for reads nothing.",
    },
  ],
} as const satisfies TextProperty
