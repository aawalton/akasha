import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const debonairesCaptainLog = {
  id: "01a0d60c-75b5-7aa8-b824-4b24e0598c6c",
  type: "page-type/temper-lore-book",
  slug: "debonaires-captain-log",
  title: "Debonaire's Captain Log",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 6945,
  bookIndex: 16,
  charted: true,
  quest: 6762,
  positions: "jsonl",
} as const satisfies TemperLoreBook
