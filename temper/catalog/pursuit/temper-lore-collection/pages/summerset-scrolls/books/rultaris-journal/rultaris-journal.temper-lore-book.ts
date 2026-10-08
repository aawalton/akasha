import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rultarisJournal = {
  id: "01a0d60a-d5bd-7361-bcae-e5c5e09b0f67",
  type: "page-type/temper-lore-book",
  slug: "rultaris-journal",
  title: "Rultari's Journal",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4976,
  bookIndex: 94,
  charted: true,
  quest: 6146,
  positions: "jsonl",
  createdAt: "2026-09-25T00:50:29.437Z",
  updatedAt: "2026-09-25T00:50:31.000Z",
} as const satisfies TemperLoreBook
