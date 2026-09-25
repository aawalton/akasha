import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lashumsReport = {
  id: "01a0d60c-75b5-7a25-9982-652dbf81be47",
  type: "page-type/temper-lore-book",
  slug: "lashums-report",
  title: "Lashum's Report",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7005,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
