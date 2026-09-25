import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const marthasJournal = {
  id: "01a0d5f4-6f1a-7b42-a763-e7c5087cc24e",
  type: "page-type/temper-lore-book",
  slug: "marthas-journal",
  title: "Martha's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1614,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
