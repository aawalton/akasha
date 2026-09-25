import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const beforeTheGatesOfGideon = {
  id: "01a0d60b-fdaf-70f5-b314-cf7001f84af0",
  type: "page-type/temper-lore-book",
  slug: "before-the-gates-of-gideon",
  title: "Before the Gates of Gideon",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6707,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
