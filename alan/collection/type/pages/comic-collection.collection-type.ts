import type { CollectionType } from "akasha/alan/collection/type/collection-type.page-type.types.ts"

export const comicCollection = {
  id: "01a06579-855d-7004-b7ac-68a1894b53de",
  type: "collection-type",
  slug: "comic-collection",
  title: "Comic Collection",
  unit: "unit/words",
  collectionTypeStatus: "someday-maybe",
} as const satisfies CollectionType
