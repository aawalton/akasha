import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCareAndFeedingOfTrolls = {
  id: "01a0d5f1-c91b-7f23-a656-70f3c1ea399b",
  type: "page-type/temper-lore-book",
  slug: "the-care-and-feeding-of-trolls",
  title: "The Care and Feeding of Trolls",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2661,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
