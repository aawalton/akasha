import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromEna = {
  id: "01a0d60b-8108-72ae-b235-076528074a58",
  type: "page-type/temper-lore-book",
  slug: "letter-from-ena",
  title: "Letter from Ena",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5943,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
