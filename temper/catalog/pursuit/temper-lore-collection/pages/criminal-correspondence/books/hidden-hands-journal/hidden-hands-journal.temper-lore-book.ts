import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hiddenHandsJournal = {
  id: "01a0d5f1-f451-7609-81bd-39bfb03820b4",
  type: "page-type/temper-lore-book",
  slug: "hidden-hands-journal",
  title: "Hidden-Hands' Journal",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 75,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
