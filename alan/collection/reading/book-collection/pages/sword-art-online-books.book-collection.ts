import type { BookCollection } from "akasha/alan/collection/reading/book-collection/book-collection.page-type.types.ts"

export const swordArtOnlineBooks = {
  id: "01a06808-148f-7013-9bac-2b323ced67dd",
  type: "page-type/book-collection",
  slug: "sword-art-online-books",
  title: "Sword Art Online Books",
  partOfCollections: ["fandom/sword-art-online"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "following",
  grade: "B",
} as const satisfies BookCollection
