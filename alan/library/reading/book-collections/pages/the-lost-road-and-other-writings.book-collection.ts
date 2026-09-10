import type { BookCollection } from "../book-collection.page-type.types.ts"

export const theLostRoadAndOtherWritings = {
  id: "01a06808-148f-702a-8fce-3c0f061d6cd4",
  pageTypeSlug: "book-collection",
  type: "book-collection",
  slug: "the-lost-road-and-other-writings",
  title: "The Lost Road and Other Writings",
  partOfCollections: ["the-history-of-middle-earth"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  publishedAt: "1987-01-01",
} as const satisfies BookCollection
