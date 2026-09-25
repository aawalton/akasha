import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theCollectedWordsOfNealAMaxwellVolume2 = {
  id: "01a06808-148f-701c-84d3-8cdc557e6746",
  type: "page-type/book-collection",
  slug: "the-collected-words-of-neal-a-maxwell-volume-2",
  title: "The Collected Words of Neal A. Maxwell Volume 2",
  partOfCollections: ["book-collection/the-collected-words-of-neal-a-maxwell"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
  grade: "C",
} as const satisfies BookCollection
