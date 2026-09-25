import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const addersRansomNote = {
  id: "01a0d60b-fdaf-7408-97d4-de7bc89b988b",
  type: "page-type/temper-lore-book",
  slug: "adders-ransom-note",
  title: "Adder's Ransom Note",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6593,
  bookIndex: 50,
  charted: true,
  quest: 6658,
  positions: "jsonl",
} as const satisfies TemperLoreBook
