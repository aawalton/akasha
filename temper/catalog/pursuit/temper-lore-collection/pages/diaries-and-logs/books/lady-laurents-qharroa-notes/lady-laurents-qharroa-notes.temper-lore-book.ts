import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ladyLaurentsQharroaNotes = {
  id: "01a0d5f2-509f-790d-b347-c83fafc1cb2f",
  type: "page-type/temper-lore-book",
  slug: "lady-laurents-qharroa-notes",
  title: "Lady Laurent's Qharroa Notes",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 2003,
  bookIndex: 56,
  charted: true,
  quest: 3317,
  positions: "jsonl",
} as const satisfies TemperLoreBook
