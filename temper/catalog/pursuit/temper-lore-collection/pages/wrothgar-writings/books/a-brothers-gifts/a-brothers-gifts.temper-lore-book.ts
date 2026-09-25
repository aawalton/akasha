import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aBrothersGifts = {
  id: "01a0d5f6-d68a-7350-a18d-66e6ffc53238",
  type: "page-type/temper-lore-book",
  slug: "a-brothers-gifts",
  title: "A Brother's Gifts",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3171,
  bookIndex: 89,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
