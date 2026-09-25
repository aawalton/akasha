import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bigDamnBugs = {
  id: "01a0d5f2-509e-7546-b860-6fd334d54841",
  type: "page-type/temper-lore-book",
  slug: "big-damn-bugs",
  title: "Big Damn Bugs",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 1634,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
