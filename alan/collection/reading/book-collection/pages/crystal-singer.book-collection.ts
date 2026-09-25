import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const crystalSinger = {
  id: "01a06808-148e-7014-b195-e0cc3f7ef599",
  type: "page-type/book-collection",
  slug: "crystal-singer",
  title: "Crystal Singer",
  partOfCollections: ["author/anne-mccaffrey"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies BookCollection
