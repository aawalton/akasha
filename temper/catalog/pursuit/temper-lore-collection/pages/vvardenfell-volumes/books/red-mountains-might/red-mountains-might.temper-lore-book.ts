import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const redMountainsMight = {
  id: "01a0d5f7-aa99-7c84-9844-991c2e32c235",
  type: "page-type/temper-lore-book",
  slug: "red-mountains-might",
  title: "Red Mountain's Might",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4520,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
