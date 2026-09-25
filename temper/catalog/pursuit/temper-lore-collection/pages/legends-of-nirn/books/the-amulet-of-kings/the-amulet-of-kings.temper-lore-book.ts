import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAmuletOfKings = {
  id: "01a0d5e3-d583-7eda-a98a-d2357e87deab",
  type: "page-type/temper-lore-book",
  slug: "the-amulet-of-kings",
  title: "The Amulet of Kings",
  collection: "temper-lore-collection/legends-of-nirn",
  bookIndex: 3,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
