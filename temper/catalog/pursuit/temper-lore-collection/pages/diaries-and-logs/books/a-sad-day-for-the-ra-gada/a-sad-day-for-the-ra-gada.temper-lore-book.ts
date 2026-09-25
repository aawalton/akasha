import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSadDayForTheRaGada = {
  id: "01a0d5f2-509e-7215-aff1-cab9c0ecb24c",
  type: "page-type/temper-lore-book",
  slug: "a-sad-day-for-the-ra-gada",
  title: "A Sad Day for the Ra Gada",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 555,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
