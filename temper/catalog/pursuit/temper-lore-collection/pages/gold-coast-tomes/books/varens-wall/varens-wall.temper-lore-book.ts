import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const varensWall = {
  id: "01a0d5f7-73fb-76c4-bfb0-d5f42a14cbe4",
  type: "page-type/temper-lore-book",
  slug: "varens-wall",
  title: "Varen's Wall",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3252,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
