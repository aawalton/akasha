import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePsijicOrder = {
  id: "01a0d60a-d5be-7a00-bf60-eace1a5988ac",
  type: "page-type/temper-lore-book",
  slug: "the-psijic-order",
  title: "The Psijic Order",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5112,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
