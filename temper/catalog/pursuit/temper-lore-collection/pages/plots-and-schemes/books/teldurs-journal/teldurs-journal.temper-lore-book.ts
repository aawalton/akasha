import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const teldursJournal = {
  id: "01a0d5f4-c389-70ce-848a-77aa6b3819ce",
  type: "page-type/temper-lore-book",
  slug: "teldurs-journal",
  title: "Teldur's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 531,
  bookIndex: 12,
  charted: true,
  quest: 4209,
  positions: "jsonl",
} as const satisfies TemperLoreBook
