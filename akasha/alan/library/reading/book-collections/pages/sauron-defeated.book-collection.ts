import type { BookCollection } from "../book-collection.page-type.ts"

export const sauronDefeated = {
  id: "01a06808-148f-700e-b5a9-17f26075e10a",
  pageTypeSlug: "book-collection",
  slug: "sauron-defeated",
  title: "Sauron Defeated",
  partOfSlugs: ["the-history-of-middle-earth"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  publishedAt: "1992-01-01",
} as const satisfies BookCollection
