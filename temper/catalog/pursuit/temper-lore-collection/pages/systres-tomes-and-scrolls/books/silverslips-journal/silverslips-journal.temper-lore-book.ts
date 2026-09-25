import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const silverslipsJournal = {
  id: "01a0d60c-75b6-789b-92a5-f8b3302083d5",
  type: "page-type/temper-lore-book",
  slug: "silverslips-journal",
  title: "Silverslip's Journal",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7095,
  charted: true,
  quest: 6786,
  positions: "jsonl",
} as const satisfies TemperLoreBook
