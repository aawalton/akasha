import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spiritOfNirn = {
  id: "01a0d5f3-3fdb-7967-b149-2fdc706c7abb",
  type: "page-type/temper-lore-book",
  slug: "spirit-of-nirn",
  title: "Spirit of Nirn",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 807,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
