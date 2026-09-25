import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfNicolasDouare = {
  id: "01a0d5f5-abba-7091-8ba0-2410d5f00ca5",
  type: "page-type/temper-lore-book",
  slug: "journal-of-nicolas-douare",
  title: "Journal of Nicolas Douare",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 431,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
