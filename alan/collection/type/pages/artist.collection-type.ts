import type { CollectionType } from "akasha/alan/collection/type/collection-type.page-type.types.ts"

export const artist = {
  id: "01a06579-855c-7001-8e2b-9d3bf35bfae6",
  type: "page-type/collection-type",
  slug: "artist",
  title: "Artist",
  unit: "unit/minutes",
  collectionTypeStatus: "done",
} as const satisfies CollectionType
