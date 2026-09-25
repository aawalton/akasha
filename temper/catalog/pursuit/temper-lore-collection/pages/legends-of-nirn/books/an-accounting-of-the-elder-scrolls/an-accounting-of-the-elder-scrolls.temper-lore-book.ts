import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anAccountingOfTheElderScrolls = {
  id: "01a0d5e3-d583-7ad6-b7da-b0e00fe99a75",
  type: "page-type/temper-lore-book",
  slug: "an-accounting-of-the-elder-scrolls",
  title: "An Accounting of the Elder Scrolls",
  collection: "temper-lore-collection/legends-of-nirn",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
