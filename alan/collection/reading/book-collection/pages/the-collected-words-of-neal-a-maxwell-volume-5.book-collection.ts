import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theCollectedWordsOfNealAMaxwellVolume5 = {
  id: "01a06808-148f-701f-84d2-25def1bb7352",
  type: "page-type/book-collection",
  slug: "the-collected-words-of-neal-a-maxwell-volume-5",
  title: "The Collected Words of Neal A. Maxwell Volume 5",
  partOfCollections: ["book-collection/the-collected-words-of-neal-a-maxwell"],
  position: 5,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
  grade: "C",
} as const satisfies BookCollection
