import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const edvildasLogBook = {
  id: "01a0d60b-fdaf-7fde-9364-7e30498d9e81",
  type: "page-type/temper-lore-book",
  slug: "edvildas-log-book",
  title: "Edvilda's Log Book",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6682,
  bookIndex: 51,
  charted: true,
  quest: 6666,
  positions: "jsonl",
} as const satisfies TemperLoreBook
