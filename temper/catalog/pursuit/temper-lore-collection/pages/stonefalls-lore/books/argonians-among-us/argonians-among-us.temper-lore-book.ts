import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const argoniansAmongUs = {
  id: "01a0d5e4-6057-7c76-82cf-8a89c97e12ce",
  type: "page-type/temper-lore-book",
  slug: "argonians-among-us",
  title: "Argonians Among Us",
  collection: "temper-lore-collection/stonefalls-lore",
  bookIndex: 4,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
