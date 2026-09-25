import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const galerionTheMystic = {
  id: "01a0d5e3-7fd0-7228-8a98-ce558500637b",
  type: "page-type/temper-lore-book",
  slug: "galerion-the-mystic",
  title: "Galerion the Mystic",
  collection: "temper-lore-collection/biographies",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
