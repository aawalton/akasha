import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whoAreTheSeaElves = {
  id: "01a0d60c-baf4-76e1-b9ef-7bbfd41a837f",
  type: "page-type/temper-lore-book",
  slug: "who-are-the-sea-elves",
  title: "Who Are the Sea Elves?",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7576,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
