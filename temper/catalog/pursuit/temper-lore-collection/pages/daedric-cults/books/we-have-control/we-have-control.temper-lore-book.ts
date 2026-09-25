import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const weHaveControl = {
  id: "01a0d5f2-253c-71f9-95b1-36ff2c98ee83",
  type: "page-type/temper-lore-book",
  slug: "we-have-control",
  title: "We Have Control",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1376,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
