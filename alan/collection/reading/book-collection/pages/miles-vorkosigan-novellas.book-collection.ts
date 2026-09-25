import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const milesVorkosiganNovellas = {
  id: "01a06808-148f-7003-baf4-75d79e4989d8",
  type: "page-type/book-collection",
  slug: "miles-vorkosigan-novellas",
  title: "Miles Vorkosigan Novellas",
  partOfCollections: ["author/lois-mcmaster-bujold"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
