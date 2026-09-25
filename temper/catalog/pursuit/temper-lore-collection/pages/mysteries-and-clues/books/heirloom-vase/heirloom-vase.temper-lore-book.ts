import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const heirloomVase = {
  id: "01a0d5f4-07b8-75b8-a133-d413d04c6900",
  type: "page-type/temper-lore-book",
  slug: "heirloom-vase",
  title: "Heirloom Vase",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1200,
  bookIndex: 32,
  charted: true,
  quest: 4497,
  positions: "jsonl",
} as const satisfies TemperLoreBook
