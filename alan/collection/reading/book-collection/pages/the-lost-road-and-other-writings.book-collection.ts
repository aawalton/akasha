import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theLostRoadAndOtherWritings = {
  id: "01a06808-148f-702a-8fce-3c0f061d6cd4",
  type: "page-type/book-collection",
  slug: "the-lost-road-and-other-writings",
  title: "The Lost Road and Other Writings",
  partOfCollections: ["book-collection/the-history-of-middle-earth"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  publishedAt: "1987-01-01",
} as const satisfies BookCollection
