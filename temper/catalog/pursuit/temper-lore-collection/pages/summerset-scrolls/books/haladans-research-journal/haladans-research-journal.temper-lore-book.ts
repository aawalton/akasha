import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const haladansResearchJournal = {
  id: "01a0d60a-d5bc-7975-9997-91dc6bd08c9a",
  type: "page-type/temper-lore-book",
  slug: "haladans-research-journal",
  title: "Haladan's Research Journal",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4696,
  bookIndex: 60,
  charted: true,
  quest: 6111,
  positions: "jsonl",
} as const satisfies TemperLoreBook
