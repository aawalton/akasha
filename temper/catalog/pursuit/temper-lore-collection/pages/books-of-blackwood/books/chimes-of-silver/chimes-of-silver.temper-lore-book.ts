import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chimesOfSilver = {
  id: "01a0d60b-fdaf-71f5-a049-6bd796ac5482",
  type: "page-type/temper-lore-book",
  slug: "chimes-of-silver",
  title: "Chimes of Silver",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6580,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
