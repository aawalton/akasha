import type { BookCollection } from "../book-collection.page-type.ts"

export const swordArtOnlineBooks = {
  id: "01a06808-148f-7013-9bac-2b323ced67dd",
  pageTypeSlug: "book-collection",
  slug: "sword-art-online-books",
  title: "Sword Art Online Books",
  partOfSlugs: ["fandom/sword-art-online"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "following",
  rank: "B",
} as const satisfies BookCollection
