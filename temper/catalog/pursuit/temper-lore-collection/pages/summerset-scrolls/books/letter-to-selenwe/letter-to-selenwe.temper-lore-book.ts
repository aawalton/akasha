import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToSelenwe = {
  id: "01a0d60a-d5bd-7b50-9283-feaedec2cd01",
  type: "page-type/temper-lore-book",
  slug: "letter-to-selenwe",
  title: "Letter to Selenwe",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4908,
  bookIndex: 90,
  charted: true,
  quest: 6118,
  positions: "jsonl",
} as const satisfies TemperLoreBook
