import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const saints = {
  id: "01a06808-148f-700d-bb5f-0fcfab48d5fe",
  type: "page-type/book-collection",
  slug: "saints",
  title: "Saints",
  partOfCollections: ["book-collection/histories-3"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
