import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToAkash = {
  id: "01a0d5f3-0ef8-74e8-aaf6-676367bc8379",
  type: "page-type/temper-lore-book",
  slug: "letter-to-akash",
  title: "Letter to Akash",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1780,
  bookIndex: 68,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
