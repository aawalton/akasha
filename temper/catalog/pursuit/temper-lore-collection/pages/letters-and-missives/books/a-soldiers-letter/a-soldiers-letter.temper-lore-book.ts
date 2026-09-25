import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSoldiersLetter = {
  id: "01a0d5f3-0ef7-7143-be92-9a302bde8abf",
  type: "page-type/temper-lore-book",
  slug: "a-soldiers-letter",
  title: "A Soldier's Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1233,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
