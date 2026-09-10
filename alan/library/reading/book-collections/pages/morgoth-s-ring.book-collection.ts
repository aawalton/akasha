import type { BookCollection } from "../book-collection.page-type.types.ts"

export const morgothSRing = {
  id: "01a06808-148f-7005-850e-ae480c0fa1b3",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "morgoth-s-ring",
  title: "Morgoth's Ring",
  partOfCollections: ["the-history-of-middle-earth"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  publishedAt: "1993-01-01",
} as const satisfies BookCollection
