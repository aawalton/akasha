import type { BookCollection } from "../book-collection.page-type.ts"

export const toRead = {
  id: "01a06808-148f-7037-b509-e773689b474e",
  pageTypeSlug: "book-collection",
  slug: "to-read",
  title: "To Read",
  partOfSlugs: ["book-collections"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
