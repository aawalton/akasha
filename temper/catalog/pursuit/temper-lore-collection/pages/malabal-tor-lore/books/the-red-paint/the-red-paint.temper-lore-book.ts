import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theRedPaint = {
  id: "01a0d5e4-74e1-756f-aa38-9933be10a79d",
  type: "page-type/temper-lore-book",
  slug: "the-red-paint",
  title: "The Red Paint",
  collection: "temper-lore-collection/malabal-tor-lore",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
