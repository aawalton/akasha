import type { TextProperty } from "@akasha/pages-system/text-property"

export type CollectionTags = string

export const collectionTags = {
  id: "01a063de-2c60-7012-86a4-f75160a97d69",
  pageTypeSlug: "text-property",
  slug: "collection-tags",
  propertySlug: "tags",
  definition: "a word a person files a collection under",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tag is the person's own rather than the provider's.",
    },
  ],
} as const satisfies TextProperty
