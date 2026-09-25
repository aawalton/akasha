import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWilderkingLegend = {
  id: "01a0d5e4-ec69-75ae-babe-238a6f42a6b1",
  type: "page-type/temper-lore-book",
  slug: "the-wilderking-legend",
  title: "The Wilderking Legend",
  collection: "temper-lore-collection/greenshade-lore",
  bookIndex: 4,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
