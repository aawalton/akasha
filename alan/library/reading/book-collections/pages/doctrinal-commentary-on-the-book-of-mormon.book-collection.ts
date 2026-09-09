import type { BookCollection } from "../book-collection.page-type.ts"

export const doctrinalCommentaryOnTheBookOfMormon = {
  id: "01a06808-148e-701a-bfed-0bb01a00297f",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "doctrinal-commentary-on-the-book-of-mormon",
  title: "Doctrinal Commentary on the Book of Mormon",
  partOfCollections: ["faith-collections"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
} as const satisfies BookCollection
