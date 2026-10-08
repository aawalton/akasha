import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const commentariesOnTheLawsOfEngland = {
  id: "01a06808-148e-7013-9b52-2a421e673ea0",
  type: "page-type/book-collection",
  slug: "commentaries-on-the-laws-of-england",
  title: "Commentaries on the Laws of England",
  partOfCollections: ["book-collection/commentaries"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  createdAt: "2026-09-03T16:09:15.150Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
