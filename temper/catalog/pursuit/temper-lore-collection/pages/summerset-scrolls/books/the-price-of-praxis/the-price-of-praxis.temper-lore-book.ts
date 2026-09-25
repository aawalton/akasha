import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePriceOfPraxis = {
  id: "01a0d60a-d5be-70aa-98a1-007e386dff3f",
  type: "page-type/temper-lore-book",
  slug: "the-price-of-praxis",
  title: "The Price of Praxis",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4920,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
