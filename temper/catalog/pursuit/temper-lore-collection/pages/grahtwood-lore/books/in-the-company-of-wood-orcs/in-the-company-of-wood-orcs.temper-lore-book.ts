import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inTheCompanyOfWoodOrcs = {
  id: "01a0d5e4-d87c-7e5d-a48c-bc1739cd0975",
  type: "page-type/temper-lore-book",
  slug: "in-the-company-of-wood-orcs",
  title: "In the Company of Wood Orcs",
  collection: "temper-lore-collection/grahtwood-lore",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
