import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const teachingsOfTheLatterDayProphetsSeries = {
  id: "01a06808-148f-7016-b602-2e01b72a30f3",
  type: "page-type/book-collection",
  slug: "teachings-of-the-latter-day-prophets-series",
  title: "Teachings of the Latter-day Prophets Series",
  partOfCollections: ["book-collection/faith-collections"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies BookCollection
