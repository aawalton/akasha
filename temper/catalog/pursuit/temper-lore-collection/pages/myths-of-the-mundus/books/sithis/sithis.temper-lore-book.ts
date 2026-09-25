import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sithis = {
  id: "01a0d5e4-11d7-74b0-a324-ed8c87b392fb",
  type: "page-type/temper-lore-book",
  slug: "sithis",
  title: "Sithis",
  collection: "temper-lore-collection/myths-of-the-mundus",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
