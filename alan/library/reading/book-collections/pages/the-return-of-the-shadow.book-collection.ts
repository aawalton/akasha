import type { BookCollection } from "../book-collection.page-type.ts"

export const theReturnOfTheShadow = {
  id: "01a06808-148f-702e-9c43-36ffec852b9f",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "the-return-of-the-shadow",
  title: "The Return of the Shadow",
  partOfCollections: ["the-history-of-middle-earth"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  publishedAt: "1988-01-01",
} as const satisfies BookCollection
