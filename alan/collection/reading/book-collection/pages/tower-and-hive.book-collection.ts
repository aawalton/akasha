import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const towerAndHive = {
  id: "01a06808-148f-7039-9ea6-a05b3f78898d",
  type: "page-type/book-collection",
  slug: "tower-and-hive",
  title: "Tower and Hive",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
