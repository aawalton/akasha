import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const quartermastersLog = {
  id: "01a0d5f2-509f-75e7-91aa-bdf53b1a12f7",
  type: "page-type/temper-lore-book",
  slug: "quartermasters-log",
  title: "Quartermaster's Log",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1622,
  bookIndex: 39,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
