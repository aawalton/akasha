import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toCaptainMarck = {
  id: "01a0d5f3-0ef9-7e5b-a0e8-577d71a2678f",
  type: "page-type/temper-lore-book",
  slug: "to-captain-marck",
  title: "To Captain Marck",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1548,
  bookIndex: 60,
  charted: true,
  quest: 4687,
  positions: "jsonl",
} as const satisfies TemperLoreBook
