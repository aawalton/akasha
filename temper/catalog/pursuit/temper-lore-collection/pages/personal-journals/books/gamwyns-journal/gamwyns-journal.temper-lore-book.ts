import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gamwynsJournal = {
  id: "01a0d5f4-6f1a-7830-8c0b-432d120bbf01",
  type: "page-type/temper-lore-book",
  slug: "gamwyns-journal",
  title: "Gamwyn's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 757,
  bookIndex: 28,
  charted: true,
  quest: 4178,
  positions: "jsonl",
} as const satisfies TemperLoreBook
