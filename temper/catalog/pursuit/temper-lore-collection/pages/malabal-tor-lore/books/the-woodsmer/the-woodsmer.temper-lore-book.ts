import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWoodsmer = {
  id: "01a0d5e4-74e1-7aa3-929b-66f3c17f8f39",
  type: "page-type/temper-lore-book",
  slug: "the-woodsmer",
  title: "The Woodsmer",
  collection: "temper-lore-collection/malabal-tor-lore",
  bookIndex: 2,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
