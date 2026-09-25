import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const archmagisterMavonsAscension = {
  id: "01a0d60d-708d-72db-9d4e-0cbec3087371",
  type: "page-type/temper-lore-book",
  slug: "archmagister-mavons-ascension",
  title: "Archmagister Mavon's Ascension",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7788,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
