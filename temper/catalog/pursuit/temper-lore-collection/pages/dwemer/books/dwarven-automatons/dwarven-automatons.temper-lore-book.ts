import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dwarvenAutomatons = {
  id: "01a0d5e3-c18f-714b-a2c2-5e2f4f98d8e7",
  type: "page-type/temper-lore-book",
  slug: "dwarven-automatons",
  title: "Dwarven Automatons",
  collection: "temper-lore-collection/dwemer",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
