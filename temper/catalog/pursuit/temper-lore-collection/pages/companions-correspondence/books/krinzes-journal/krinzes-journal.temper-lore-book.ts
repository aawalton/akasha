import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const krinzesJournal = {
  id: "01a0d60d-bbe4-7cff-9274-a26253c1e8d1",
  type: "page-type/temper-lore-book",
  slug: "krinzes-journal",
  title: "Krin'ze's Journal",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8327,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
