import type { BookCollection } from "../book-collection.page-type.ts"

export const harryPotterBooks = {
  id: "01a06808-148e-7024-a2c4-b2920bc5e366",
  pageTypeSlug: "book-collection",
  slug: "harry-potter-books",
  title: "Harry Potter Books",
  partOfSlugs: ["harry-potter"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "following",
  rank: "B",
} as const satisfies BookCollection
