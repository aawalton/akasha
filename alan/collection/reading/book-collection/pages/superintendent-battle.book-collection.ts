import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const superintendentBattle = {
  id: "01a06808-148f-7012-aadf-3a0e057b5585",
  type: "page-type/book-collection",
  slug: "superintendent-battle",
  title: "Superintendent Battle",
  partOfCollections: ["author/agatha-christie"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
