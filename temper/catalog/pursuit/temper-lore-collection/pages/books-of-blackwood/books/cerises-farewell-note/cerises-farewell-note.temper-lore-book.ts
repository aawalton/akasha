import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cerisesFarewellNote = {
  id: "01a0d60b-fdaf-7adc-82a4-634ad0b58346",
  type: "page-type/temper-lore-book",
  slug: "cerises-farewell-note",
  title: "Cerise's Farewell Note",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6596,
  bookIndex: 65,
  charted: true,
  quest: 6661,
  positions: "jsonl",
} as const satisfies TemperLoreBook
