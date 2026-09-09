import type { BookCollection } from "../book-collection.page-type.ts"

export const jKRowlingOriginals = {
  id: "01a06808-148e-702d-99f5-2c21f3be7dda",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "j-k-rowling-originals",
  title: "J. K. Rowling Originals",
  partOfCollections: ["harry-potter-books"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalLink: "https://www.harrypotter.com/writing-by-jk-rowling",
} as const satisfies BookCollection
