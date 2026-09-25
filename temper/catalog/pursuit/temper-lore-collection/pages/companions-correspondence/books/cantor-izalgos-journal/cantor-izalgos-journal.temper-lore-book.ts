import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cantorIzalgosJournal = {
  id: "01a0d60d-bbe4-7f75-888a-ae1d53669d17",
  type: "page-type/temper-lore-book",
  slug: "cantor-izalgos-journal",
  title: "Cantor Izalgo's Journal",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8063,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
