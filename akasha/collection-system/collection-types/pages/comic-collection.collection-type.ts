import type { CollectionType } from "../collection-type.page-type.ts"

export const comicCollection = {
  id: "01a06579-855d-7004-b7ac-68a1894b53de",
  pageTypeSlug: "collection-type",
  slug: "comic-collection",
  title: "Comic Collection",
  unitSlug: "words",
  collectionTypeStatus: "someday-maybe",
} as const satisfies CollectionType
