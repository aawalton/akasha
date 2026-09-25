import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const imperialRefugeesJournal = {
  id: "01a0d5f4-6f1a-7fe6-995e-c4e1f66de3c5",
  type: "page-type/temper-lore-book",
  slug: "imperial-refugees-journal",
  title: "Imperial Refugee's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1919,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
