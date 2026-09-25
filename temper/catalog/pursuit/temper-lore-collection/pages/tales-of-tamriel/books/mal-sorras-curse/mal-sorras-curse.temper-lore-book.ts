import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const malSorrasCurse = {
  id: "01a0d5f5-7767-7ecc-a76b-d4625d89ab79",
  type: "page-type/temper-lore-book",
  slug: "mal-sorras-curse",
  title: "Mal Sorra's Curse",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1625,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
