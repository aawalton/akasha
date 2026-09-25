import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const selenwesJournal = {
  id: "01a0d60a-d5bd-723a-9d85-d0006c6d565f",
  type: "page-type/temper-lore-book",
  slug: "selenwes-journal",
  title: "Selenwe's Journal",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4909,
  bookIndex: 91,
  charted: true,
  quest: 6118,
  positions: "jsonl",
} as const satisfies TemperLoreBook
