import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const verandissJournal = {
  id: "01a0d5f4-07b9-7683-a84d-57a6cf2930d8",
  type: "page-type/temper-lore-book",
  slug: "verandiss-journal",
  title: "Verandis's Journal",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 6250,
  charted: true,
  quest: 6555,
  positions: "jsonl",
} as const satisfies TemperLoreBook
