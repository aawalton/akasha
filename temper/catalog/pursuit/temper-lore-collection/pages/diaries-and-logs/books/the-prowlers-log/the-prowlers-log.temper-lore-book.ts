import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theProwlersLog = {
  id: "01a0d5f2-509f-71f0-ad72-1b36714d5310",
  type: "page-type/temper-lore-book",
  slug: "the-prowlers-log",
  title: "The Prowler's Log",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1402,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
