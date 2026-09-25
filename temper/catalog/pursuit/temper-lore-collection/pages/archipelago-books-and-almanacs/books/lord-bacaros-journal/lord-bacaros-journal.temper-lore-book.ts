import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lordBacarosJournal = {
  id: "01a0d60c-baf3-7d23-b1dc-82e4cdd0fd1b",
  type: "page-type/temper-lore-book",
  slug: "lord-bacaros-journal",
  title: "Lord Bacaro's Journal",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7288,
  bookIndex: 9,
  charted: true,
  quest: 6847,
  positions: "jsonl",
} as const satisfies TemperLoreBook
