import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const darkRuins = {
  id: "01a0d5e4-9c9a-7102-802f-174930fae4c1",
  type: "page-type/temper-lore-book",
  slug: "dark-ruins",
  title: "Dark Ruins",
  collection: "temper-lore-collection/deshaan-lore",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
