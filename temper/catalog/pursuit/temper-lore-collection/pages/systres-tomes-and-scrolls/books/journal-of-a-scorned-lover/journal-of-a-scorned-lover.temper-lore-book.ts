import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfAScornedLover = {
  id: "01a0d60c-75b5-7345-8e49-092756905c8f",
  type: "page-type/temper-lore-book",
  slug: "journal-of-a-scorned-lover",
  title: "Journal of a Scorned Lover",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7152,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
