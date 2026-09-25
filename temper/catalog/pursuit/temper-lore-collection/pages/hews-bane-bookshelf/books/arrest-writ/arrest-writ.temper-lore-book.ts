import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const arrestWrit = {
  id: "01a0d5f7-4293-7377-8acf-cb1b0d0ba246",
  type: "page-type/temper-lore-book",
  slug: "arrest-writ",
  title: "Arrest Writ",
  collection: "temper-lore-collection/hews-bane-bookshelf",
  esoBookId: 3326,
  bookIndex: 57,
  charted: true,
  quest: 5581,
  positions: "jsonl",
} as const satisfies TemperLoreBook
