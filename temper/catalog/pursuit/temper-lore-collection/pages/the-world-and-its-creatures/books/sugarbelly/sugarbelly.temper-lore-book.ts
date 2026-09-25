import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sugarbelly = {
  id: "01a0d5f5-f3e4-7219-8160-01e866e1dfbe",
  type: "page-type/temper-lore-book",
  slug: "sugarbelly",
  title: "Sugarbelly",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1570,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
