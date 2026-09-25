import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const callingAllSeaElves = {
  id: "01a0d60c-baf3-7c81-99fc-45967abb9296",
  type: "page-type/temper-lore-book",
  slug: "calling-all-sea-elves",
  title: "Calling All Sea Elves!",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7314,
  bookIndex: 73,
  charted: true,
  quest: 6887,
  positions: "jsonl",
} as const satisfies TemperLoreBook
