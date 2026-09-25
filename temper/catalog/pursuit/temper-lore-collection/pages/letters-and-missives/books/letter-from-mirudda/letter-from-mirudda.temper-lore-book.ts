import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromMirudda = {
  id: "01a0d5f3-0ef7-7fa2-8b16-fa8b7372e783",
  type: "page-type/temper-lore-book",
  slug: "letter-from-mirudda",
  title: "Letter from Mirudda",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 106,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
