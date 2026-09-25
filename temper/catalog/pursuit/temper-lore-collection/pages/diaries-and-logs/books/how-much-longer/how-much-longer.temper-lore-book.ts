import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const howMuchLonger = {
  id: "01a0d5f2-509f-7b25-94c0-ba95cec998f4",
  type: "page-type/temper-lore-book",
  slug: "how-much-longer",
  title: "How Much Longer?",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1637,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
