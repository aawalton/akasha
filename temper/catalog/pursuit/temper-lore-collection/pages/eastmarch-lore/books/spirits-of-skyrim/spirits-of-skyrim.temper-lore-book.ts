import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spiritsOfSkyrim = {
  id: "01a0d5e4-88dc-7e8c-9d35-0e09fe2413b4",
  type: "page-type/temper-lore-book",
  slug: "spirits-of-skyrim",
  title: "Spirits of Skyrim",
  collection: "temper-lore-collection/eastmarch-lore",
  bookIndex: 6,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
