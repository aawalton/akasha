import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aTimeOfTroubles = {
  id: "01a0d5f2-509e-7191-9f9f-2fed0d224ed0",
  type: "page-type/temper-lore-book",
  slug: "a-time-of-troubles",
  title: "A Time of Troubles",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1290,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
