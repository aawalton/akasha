import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hereLiesArah = {
  id: "01a0d5f2-83a2-7e50-b16c-96de0aa916ae",
  type: "page-type/temper-lore-book",
  slug: "here-lies-arah",
  title: "Here Lies Arah",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1223,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
