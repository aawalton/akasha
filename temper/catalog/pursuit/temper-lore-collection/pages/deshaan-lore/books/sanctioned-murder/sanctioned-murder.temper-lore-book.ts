import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sanctionedMurder = {
  id: "01a0d5e4-9c9a-70ea-bf57-2766343d0dc9",
  type: "page-type/temper-lore-book",
  slug: "sanctioned-murder",
  title: "Sanctioned Murder",
  collection: "temper-lore-collection/deshaan-lore",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
