import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const celansJournal = {
  id: "01a0d60a-d5bc-7bbf-ad5e-2043c16cead8",
  type: "page-type/temper-lore-book",
  slug: "celans-journal",
  title: "Celan's Journal",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4839,
  bookIndex: 72,
  charted: true,
  quest: 6135,
  positions: "jsonl",
  createdAt: "2026-09-25T00:50:29.436Z",
  updatedAt: "2026-09-25T00:50:31.000Z",
} as const satisfies TemperLoreBook
