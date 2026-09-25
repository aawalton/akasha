import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const acrossTheNibenBar = {
  id: "01a0d60b-fdaf-7da2-84e9-4511706f76d9",
  type: "page-type/temper-lore-book",
  slug: "across-the-niben-bar",
  title: "Across the Niben Bar",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6686,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
