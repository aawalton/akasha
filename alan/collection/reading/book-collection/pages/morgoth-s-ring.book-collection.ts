import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const morgothSRing = {
  id: "01a06808-148f-7005-850e-ae480c0fa1b3",
  type: "page-type/book-collection",
  slug: "morgoth-s-ring",
  title: "Morgoth's Ring",
  partOfCollections: ["book-collection/the-history-of-middle-earth"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1993-01-01",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
