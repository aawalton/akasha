import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const mediaSourcePropertyId = {
  id: "01a062b8-8775-7004-96c1-c6b300535f4e",
  type: "page-type/text-property",
  slug: "media-source-property-id",
  propertySlug: "source-property-id",
  definition: "the key of the property rendering a page's audio",
  maxLength: 64,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key named here that the page type has no property for renders nothing.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T15:24:15.605Z",
  updatedAt: "2026-09-22T14:01:10.000Z",
} as const satisfies TextProperty
