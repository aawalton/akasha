import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const karnharsJournal = {
  id: "01a0d60a-d5bd-7429-8dbb-dc749d782f78",
  type: "page-type/temper-lore-book",
  slug: "karnhars-journal",
  title: "Karnhar's Journal",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4904,
  bookIndex: 86,
  charted: true,
  quest: 6146,
  positions: "jsonl",
  createdAt: "2026-09-25T00:50:29.437Z",
  updatedAt: "2026-09-25T00:50:31.000Z",
} as const satisfies TemperLoreBook
