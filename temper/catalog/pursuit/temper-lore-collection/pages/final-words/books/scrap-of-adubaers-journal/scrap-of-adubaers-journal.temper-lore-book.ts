import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrapOfAdubaersJournal = {
  id: "01a0d5f6-45ae-7475-8c84-575e92162275",
  type: "page-type/temper-lore-book",
  slug: "scrap-of-adubaers-journal",
  title: "Scrap of Adubaer's Journal",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1090,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
