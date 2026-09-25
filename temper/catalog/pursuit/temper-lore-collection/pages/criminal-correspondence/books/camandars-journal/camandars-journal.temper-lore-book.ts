import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const camandarsJournal = {
  id: "01a0d5f1-f450-77b3-baf1-ead3a5277885",
  type: "page-type/temper-lore-book",
  slug: "camandars-journal",
  title: "Camandar's Journal",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 663,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
