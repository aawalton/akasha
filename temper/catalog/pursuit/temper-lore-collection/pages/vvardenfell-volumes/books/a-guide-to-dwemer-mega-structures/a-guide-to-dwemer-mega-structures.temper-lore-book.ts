import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aGuideToDwemerMegaStructures = {
  id: "01a0d5f7-aa97-7cc2-83c8-19cc2616b020",
  type: "page-type/temper-lore-book",
  slug: "a-guide-to-dwemer-mega-structures",
  title: "A Guide to Dwemer Mega-Structures",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3981,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
