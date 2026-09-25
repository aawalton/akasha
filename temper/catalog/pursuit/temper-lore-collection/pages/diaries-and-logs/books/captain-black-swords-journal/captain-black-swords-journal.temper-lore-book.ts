import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainBlackSwordsJournal = {
  id: "01a0d5f2-509e-7fd7-8341-ea6e20f621e5",
  type: "page-type/temper-lore-book",
  slug: "captain-black-swords-journal",
  title: "Captain Black Sword's Journal",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 3963,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
