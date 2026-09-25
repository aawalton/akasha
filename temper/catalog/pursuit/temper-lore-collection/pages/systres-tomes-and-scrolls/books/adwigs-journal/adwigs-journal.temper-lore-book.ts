import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const adwigsJournal = {
  id: "01a0d60c-75b4-7040-97af-8f01ae3ab907",
  type: "page-type/temper-lore-book",
  slug: "adwigs-journal",
  title: "Adwig's Journal",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7026,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
