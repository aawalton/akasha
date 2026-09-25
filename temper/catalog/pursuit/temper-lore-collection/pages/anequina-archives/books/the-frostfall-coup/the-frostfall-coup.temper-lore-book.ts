import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFrostfallCoup = {
  id: "01a0d60b-2346-7e6a-88b4-6ad232122556",
  type: "page-type/temper-lore-book",
  slug: "the-frostfall-coup",
  title: "The Frostfall Coup",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5662,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
