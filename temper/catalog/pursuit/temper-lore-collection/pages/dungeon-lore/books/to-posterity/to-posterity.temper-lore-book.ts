import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toPosterity = {
  id: "01a0d5e3-aaa1-797a-8e6b-1955251cef83",
  type: "page-type/temper-lore-book",
  slug: "to-posterity",
  title: "To Posterity",
  collection: "temper-lore-collection/dungeon-lore",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
