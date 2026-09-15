import type { CollectionType } from "akasha/alan/collection/type/collection-type.page-type.types.ts"

export const author = {
  id: "01a06579-855d-7000-a75f-3c6b6c6218d7",
  type: "page-type/collection-type",
  slug: "author",
  title: "Author",
  unit: "unit/words",
  collectionTypeStatus: "not-doing",
} as const satisfies CollectionType
