import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const strakesAndFuttocks = {
  id: "01a0d5f2-db26-7d46-8832-b2d65d7bce2d",
  type: "page-type/temper-lore-book",
  slug: "strakes-and-futtocks",
  title: "Strakes and Futtocks",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1771,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
