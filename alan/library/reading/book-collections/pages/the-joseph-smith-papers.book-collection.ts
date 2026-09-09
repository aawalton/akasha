import type { BookCollection } from "../book-collection.page-type.ts"

export const theJosephSmithPapers = {
  id: "01a06808-148f-7026-84f2-cf5ead114ec3",
  pageTypeSlug: "book-collection",
  slug: "the-joseph-smith-papers",
  title: "The Joseph Smith Papers",
  partOfCollections: ["joseph-smith"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
} as const satisfies BookCollection
