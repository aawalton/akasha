import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const permitOfTrade = {
  id: "01a0d5f6-d68b-72b2-b013-e0a6646594ed",
  type: "page-type/temper-lore-book",
  slug: "permit-of-trade",
  title: "Permit of Trade",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3084,
  bookIndex: 70,
  charted: true,
  quest: 5499,
  positions: "jsonl",
} as const satisfies TemperLoreBook
