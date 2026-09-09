import type { CollectionType } from "../collection-type.page-type.ts"

export const scriptureCollection = {
  id: "01a06579-855d-7017-a844-bca1465c5748",
  pageTypeSlug: "collection-type",
  type: "collection-type",
  slug: "scripture-collection",
  title: "Scripture Collection",
  unit: "words",
  collectionTypeStatus: "done",
} as const satisfies CollectionType
