import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ladiesOfGreen = {
  id: "01a0d5f3-3fdb-7e72-8fc6-7b52d23bcb7a",
  type: "page-type/temper-lore-book",
  slug: "ladies-of-green",
  title: "Ladies of Green",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 596,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
