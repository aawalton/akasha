import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToVelsa = {
  id: "01a0d5f7-4293-7b5a-93ee-2e278ae2ccf2",
  type: "page-type/temper-lore-book",
  slug: "letter-to-velsa",
  title: "Letter to Velsa",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3280,
  bookIndex: 55,
  charted: true,
  quest: 5566,
  positions: "jsonl",
} as const satisfies TemperLoreBook
