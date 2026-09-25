import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ranasLog = {
  id: "01a0d5f2-509f-7a02-a51f-75f62d9cfd3b",
  type: "page-type/temper-lore-book",
  slug: "ranas-log",
  title: "Rana's Log",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 344,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
