import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const jKRowlingOriginals = {
  id: "01a06808-148e-702d-99f5-2c21f3be7dda",
  type: "page-type/book-collection",
  slug: "j-k-rowling-originals",
  title: "J. K. Rowling Originals",
  partOfCollections: ["book-collection/harry-potter-books"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  externalIdentity: [
    {
      source: "wizarding-world",
      externalId: "writing-by-jk-rowling",
      externalLink: "https://www.harrypotter.com/writing-by-jk-rowling",
    },
  ],
} as const satisfies BookCollection
