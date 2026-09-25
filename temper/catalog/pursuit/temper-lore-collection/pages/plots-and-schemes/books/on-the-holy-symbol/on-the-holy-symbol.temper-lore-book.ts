import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheHolySymbol = {
  id: "01a0d5f4-c388-7163-93a9-5e30a6af1c75",
  type: "page-type/temper-lore-book",
  slug: "on-the-holy-symbol",
  title: "On the Holy Symbol",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 527,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
