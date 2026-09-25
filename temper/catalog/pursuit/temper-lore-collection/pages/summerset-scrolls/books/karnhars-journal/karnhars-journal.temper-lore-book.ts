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
} as const satisfies TemperLoreBook
