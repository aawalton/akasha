import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTaleOfThreeMoons = {
  id: "01a0d60b-2346-75c0-9bcc-46db1be67cbe",
  type: "page-type/temper-lore-book",
  slug: "the-tale-of-three-moons",
  title: "The Tale of Three Moons",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5500,
  bookIndex: 77,
  charted: true,
  quest: 6322,
  positions: "jsonl",
} as const satisfies TemperLoreBook
