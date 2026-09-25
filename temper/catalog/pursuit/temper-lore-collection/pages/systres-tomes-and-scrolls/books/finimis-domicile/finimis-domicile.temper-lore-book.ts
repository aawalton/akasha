import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const finimisDomicile = {
  id: "01a0d60c-75b5-7822-8502-b53dbebf9a87",
  type: "page-type/temper-lore-book",
  slug: "finimis-domicile",
  title: "Finimi's Domicile",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7038,
  bookIndex: 6,
  charted: true,
  quest: 6780,
  positions: "jsonl",
} as const satisfies TemperLoreBook
