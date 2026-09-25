import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const showUsYourWorth = {
  id: "01a0d60a-d5bd-7686-b2b5-27cacceb09f9",
  type: "page-type/temper-lore-book",
  slug: "show-us-your-worth",
  title: "Show Us Your Worth",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4921,
  bookIndex: 92,
  charted: true,
  quest: 6117,
  positions: "jsonl",
} as const satisfies TemperLoreBook
