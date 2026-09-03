import type { BookCollection } from "../book-collection.page-type.ts"

export const herculePoirot = {
  id: "01a06808-148e-7026-afbc-eb1b805c9113",
  pageTypeSlug: "book-collection",
  slug: "hercule-poirot",
  title: "Hercule Poirot",
  partOfSlugs: ["agatha-christie"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
