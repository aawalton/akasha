import type { BookCollection } from "../book-collection.page-type.ts"

export const theTwoTowers = {
  id: "01a06808-148f-7034-a837-b4255131191d",
  pageTypeSlug: "book-collection",
  slug: "the-two-towers",
  title: "The Two Towers",
  partOfSlugs: ["the-lord-of-the-rings"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "completed",
  rank: "A",
  publishedAt: "1954-11-11",
} as const satisfies BookCollection
