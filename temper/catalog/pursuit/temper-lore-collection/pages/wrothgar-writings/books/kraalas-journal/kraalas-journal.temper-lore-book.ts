import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kraalasJournal = {
  id: "01a0d5f6-d68b-7fe4-b2a4-299f524b2101",
  type: "page-type/temper-lore-book",
  slug: "kraalas-journal",
  title: "Kraala's Journal",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3013,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
