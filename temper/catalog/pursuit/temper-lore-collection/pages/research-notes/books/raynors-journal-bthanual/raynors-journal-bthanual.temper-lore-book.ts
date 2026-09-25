import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const raynorsJournalBthanual = {
  id: "01a0d5f5-1385-72de-bd6a-72814d7503bc",
  type: "page-type/temper-lore-book",
  slug: "raynors-journal-bthanual",
  title: "Raynor's Journal: Bthanual",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 628,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
