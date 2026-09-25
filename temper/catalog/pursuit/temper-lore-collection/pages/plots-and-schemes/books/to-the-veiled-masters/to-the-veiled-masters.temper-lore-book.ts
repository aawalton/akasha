import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toTheVeiledMasters = {
  id: "01a0d5f4-c389-7b14-bb23-e3ba2164732c",
  type: "page-type/temper-lore-book",
  slug: "to-the-veiled-masters",
  title: "To the Veiled Masters",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 2031,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
