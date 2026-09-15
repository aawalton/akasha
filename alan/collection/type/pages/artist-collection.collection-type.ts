import type { CollectionType } from "akasha/alan/collection/type/collection-type.page-type.types.ts"

export const artistCollection = {
  id: "01a06579-855c-7000-8eee-000c8f802cf9",
  type: "page-type/collection-type",
  slug: "artist-collection",
  title: "Artist Collection",
  unit: "unit/minutes",
  collectionTypeStatus: "done",
} as const satisfies CollectionType
