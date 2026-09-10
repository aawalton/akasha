import type { List } from "@akasha/pages/page-property"
import type { TextProperty } from "@akasha/pages/text-property"

export type CollectionTags = List<string>

export const collectionTags = {
  id: "01a063de-2c60-7012-86a4-f75160a97d69",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "collection-tags",
  propertySlug: "tags",
  definition: "a word a person files a collection under",
  maxLength: 100,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tag is the person's own rather than the provider's.",
    },
  ],
} as const satisfies TextProperty
