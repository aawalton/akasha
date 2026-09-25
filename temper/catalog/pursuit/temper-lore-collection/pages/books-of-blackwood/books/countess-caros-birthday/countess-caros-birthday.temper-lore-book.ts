import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const countessCarosBirthday = {
  id: "01a0d60b-fdaf-763e-ae78-3fed7bf5eb1f",
  type: "page-type/temper-lore-book",
  slug: "countess-caros-birthday",
  title: "Countess Caro's Birthday",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6600,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
