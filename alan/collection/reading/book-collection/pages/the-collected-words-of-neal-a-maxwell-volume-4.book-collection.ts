import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theCollectedWordsOfNealAMaxwellVolume4 = {
  id: "01a06808-148f-701e-a9a9-f419057f689b",
  type: "page-type/book-collection",
  slug: "the-collected-words-of-neal-a-maxwell-volume-4",
  title: "The Collected Words of Neal A. Maxwell Volume 4",
  partOfCollections: ["book-collection/the-collected-words-of-neal-a-maxwell"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
  grade: "C",
} as const satisfies BookCollection
