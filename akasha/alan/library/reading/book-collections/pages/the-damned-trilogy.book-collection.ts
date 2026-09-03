import type { BookCollection } from "../book-collection.page-type.ts"

export const theDamnedTrilogy = {
  id: "01a06808-148f-7021-9cda-e2774b287074",
  pageTypeSlug: "book-collection",
  slug: "the-damned-trilogy",
  title: "The Damned Trilogy",
  partOfSlugs: ["alan-dean-foster"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
