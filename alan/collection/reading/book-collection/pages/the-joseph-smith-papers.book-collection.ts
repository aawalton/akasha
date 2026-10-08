import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theJosephSmithPapers = {
  id: "01a06808-148f-7026-84f2-cf5ead114ec3",
  type: "page-type/book-collection",
  slug: "the-joseph-smith-papers",
  title: "The Joseph Smith Papers",
  partOfCollections: ["author/joseph-smith"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
