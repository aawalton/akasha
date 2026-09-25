import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const iirdelsJournal = {
  id: "01a0d5f4-c388-7322-be94-286a0f44ae7c",
  type: "page-type/temper-lore-book",
  slug: "iirdels-journal",
  title: "Iirdel's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1981,
  bookIndex: 72,
  charted: true,
  quest: 4917,
  positions: "jsonl",
} as const satisfies TemperLoreBook
