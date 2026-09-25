import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromGorvyn = {
  id: "01a0d5f3-0ef7-7035-b1b3-fff47b7040c1",
  type: "page-type/temper-lore-book",
  slug: "letter-from-gorvyn",
  title: "Letter from Gorvyn",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1912,
  bookIndex: 77,
  charted: true,
  quest: 4894,
  positions: "jsonl",
} as const satisfies TemperLoreBook
