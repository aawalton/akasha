import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nordSoldiersJournal = {
  id: "01a0d5f4-6f1b-7e21-b1f2-f9d64dc90cca",
  type: "page-type/temper-lore-book",
  slug: "nord-soldiers-journal",
  title: "Nord Soldier's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 391,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
