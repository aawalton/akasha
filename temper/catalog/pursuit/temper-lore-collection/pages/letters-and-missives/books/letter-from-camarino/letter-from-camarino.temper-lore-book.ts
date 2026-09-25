import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromCamarino = {
  id: "01a0d5f3-0ef7-7bc2-b4a4-3f5d1b1929d6",
  type: "page-type/temper-lore-book",
  slug: "letter-from-camarino",
  title: "Letter from Camarino",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 659,
  bookIndex: 17,
  charted: true,
  quest: 4266,
  positions: "jsonl",
} as const satisfies TemperLoreBook
