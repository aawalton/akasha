import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const drunkenAphorisms = {
  id: "01a0d5f7-aa98-7424-905c-52381c696be0",
  type: "page-type/temper-lore-book",
  slug: "drunken-aphorisms",
  title: "Drunken Aphorisms",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3991,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
