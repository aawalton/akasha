import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const mediaSourcePropertyId = {
  id: "01a062b8-8775-7004-96c1-c6b300535f4e",
  type: "text-property",
  slug: "media-source-property-id",
  propertySlug: "source-property-id",
  definition: "the key of the property a page's audio is rendered from",
  maxLength: 64,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key named here that the page type has no property for renders nothing.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
