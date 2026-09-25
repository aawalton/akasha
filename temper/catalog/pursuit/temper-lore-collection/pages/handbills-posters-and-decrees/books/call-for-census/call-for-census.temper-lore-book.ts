import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const callForCensus = {
  id: "01a0d5f2-83a2-7c72-bdf1-161baab17629",
  type: "page-type/temper-lore-book",
  slug: "call-for-census",
  title: "Call for Census",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2099,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
