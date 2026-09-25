import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anArgumentForCommonSense = {
  id: "01a0d60d-9a63-7408-a7d3-5de0396a4f3d",
  type: "page-type/temper-lore-book",
  slug: "an-argument-for-common-sense",
  title: "An Argument For Common Sense",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8146,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
