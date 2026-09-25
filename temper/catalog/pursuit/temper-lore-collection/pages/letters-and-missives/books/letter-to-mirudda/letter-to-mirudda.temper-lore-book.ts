import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToMirudda = {
  id: "01a0d5f3-0ef8-7a92-b790-56b9054ec6f9",
  type: "page-type/temper-lore-book",
  slug: "letter-to-mirudda",
  title: "Letter to Mirudda",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1394,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
