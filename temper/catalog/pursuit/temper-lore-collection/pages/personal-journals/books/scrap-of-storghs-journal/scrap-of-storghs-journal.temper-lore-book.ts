import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scrapOfStorghsJournal = {
  id: "01a0d5f4-6f1b-7c1e-b694-6e16365b853b",
  type: "page-type/temper-lore-book",
  slug: "scrap-of-storghs-journal",
  title: "Scrap of Storgh's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1999,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
