import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const collectionTags = {
  id: "01a063de-2c60-7012-86a4-f75160a97d69",
  type: "page-type/text-property",
  slug: "collection-tags",
  propertySlug: "tags",
  definition: "a person's word for a collection",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tag is the person's own rather than the provider's.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T20:44:59.872Z",
  updatedAt: "2026-09-22T13:54:40.000Z",
} as const satisfies TextProperty
