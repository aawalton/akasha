import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToDarene = {
  id: "01a0d60b-fdb0-747a-b8a9-02e238f0c315",
  type: "page-type/temper-lore-book",
  slug: "letter-to-darene",
  title: "Letter to Darene",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6696,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
