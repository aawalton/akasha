import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToKathner = {
  id: "01a0d5f3-0ef8-7246-a988-205fc0ac3c86",
  type: "page-type/temper-lore-book",
  slug: "letter-to-kathner",
  title: "Letter to Kathner",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1623,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
