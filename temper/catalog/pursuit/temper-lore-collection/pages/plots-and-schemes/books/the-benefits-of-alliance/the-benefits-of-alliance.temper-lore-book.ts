import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBenefitsOfAlliance = {
  id: "01a0d5f4-c389-7e66-b3d7-6386b9070fd6",
  type: "page-type/temper-lore-book",
  slug: "the-benefits-of-alliance",
  title: "The Benefits of Alliance",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 557,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
