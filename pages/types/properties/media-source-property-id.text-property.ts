import type { TextProperty } from "../../text-properties/text-property.page-type.ts"

export type MediaSourcePropertyId = string

export const mediaSourcePropertyId = {
  id: "01a062b8-8775-7004-96c1-c6b300535f4e",
  pageTypeSlug: "text-property",
  slug: "media-source-property-id",
  propertySlug: "source-property-id",
  definition: "the key of the property a page's audio is rendered from",
  max: 64,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key named here that the page type carries no property for renders nothing.",
    },
  ],
} as const satisfies TextProperty
