import type { BookCollection } from "../book-collection.page-type.ts"

export const biographies = {
  id: "01a06808-148e-7006-a0e6-877c7026f3d3",
  pageTypeSlug: "book-collection",
  slug: "biographies",
  title: "Biographies",
  partOfSlugs: ["faith-collections"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
