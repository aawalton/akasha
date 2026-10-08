import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const theFoundersConstitution = {
  id: "01a06808-148f-7023-9561-14566d950ca7",
  type: "page-type/book-collection",
  slug: "the-founders-constitution",
  title: "The Founders Constitution",
  partOfCollections: ["book-collection/commentaries"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  createdAt: "2026-09-03T16:09:15.151Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies BookCollection
