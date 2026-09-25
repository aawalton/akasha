import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sirHughesJournal = {
  id: "01a0d5f4-6f1b-7df4-b904-f6195cdd86fe",
  type: "page-type/temper-lore-book",
  slug: "sir-hughes-journal",
  title: "Sir Hughes' Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 955,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
