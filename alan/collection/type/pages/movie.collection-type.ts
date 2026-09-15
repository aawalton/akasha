import type { CollectionType } from "akasha/alan/collection/type/collection-type.page-type.types.ts"

export const movie = {
  id: "01a06579-855d-700e-9aa9-9c4a0d2b2c36",
  type: "page-type/collection-type",
  slug: "movie",
  title: "Movie",
  unit: "unit/minutes",
  collectionTypeStatus: "done",
} as const satisfies CollectionType
