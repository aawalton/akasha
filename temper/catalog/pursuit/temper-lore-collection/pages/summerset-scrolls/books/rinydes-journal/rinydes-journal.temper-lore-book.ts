import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rinydesJournal = {
  id: "01a0d60a-d5bd-7267-b58d-94805ac81e68",
  type: "page-type/temper-lore-book",
  slug: "rinydes-journal",
  title: "Rinyde's Journal",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4788,
  bookIndex: 67,
  charted: true,
  quest: 6114,
  positions: "jsonl",
} as const satisfies TemperLoreBook
