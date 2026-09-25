import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ruminationsOnTheElderScrolls = {
  id: "01a0d5e4-11d7-7f0b-b856-bae5cd4b22c4",
  type: "page-type/temper-lore-book",
  slug: "ruminations-on-the-elder-scrolls",
  title: "Ruminations on the Elder Scrolls",
  collection: "temper-lore-collection/myths-of-the-mundus",
  bookIndex: 8,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
