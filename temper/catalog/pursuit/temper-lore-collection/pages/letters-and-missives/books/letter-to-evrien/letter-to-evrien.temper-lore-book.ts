import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToEvrien = {
  id: "01a0d5f3-0ef8-7cbc-b195-565b0886fa17",
  type: "page-type/temper-lore-book",
  slug: "letter-to-evrien",
  title: "Letter to Evrien",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1940,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
