import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const unmarkedPages = {
  id: "01a0d5f4-c389-70b3-8c2c-5c615d280af4",
  type: "page-type/temper-lore-book",
  slug: "unmarked-pages",
  title: "Unmarked Pages",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 2684,
  bookIndex: 86,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
