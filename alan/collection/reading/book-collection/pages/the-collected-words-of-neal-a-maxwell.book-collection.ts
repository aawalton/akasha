import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theCollectedWordsOfNealAMaxwell = {
  id: "01a06808-148f-701a-8291-e9339e12001b",
  type: "page-type/book-collection",
  slug: "the-collected-words-of-neal-a-maxwell",
  title: "The Collected Words of Neal A. Maxwell",
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
  grade: "C",
} as const satisfies BookCollection
