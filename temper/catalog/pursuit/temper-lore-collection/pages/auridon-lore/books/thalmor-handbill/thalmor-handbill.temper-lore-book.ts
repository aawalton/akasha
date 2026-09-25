import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thalmorHandbill = {
  id: "01a0d5e4-c4a4-75a7-8c1f-a17a8058b469",
  type: "page-type/temper-lore-book",
  slug: "thalmor-handbill",
  title: "Thalmor Handbill",
  collection: "temper-lore-collection/auridon-lore",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
