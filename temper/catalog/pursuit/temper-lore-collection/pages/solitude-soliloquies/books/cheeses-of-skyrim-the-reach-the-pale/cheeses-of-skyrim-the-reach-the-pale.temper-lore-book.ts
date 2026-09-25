import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cheesesOfSkyrimTheReachThePale = {
  id: "01a0d60b-8107-7804-b152-f1526355c4c1",
  type: "page-type/temper-lore-book",
  slug: "cheeses-of-skyrim-the-reach-the-pale",
  title: "Cheeses of Skyrim: The Reach, The Pale",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6074,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
