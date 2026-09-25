import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wayshrinesOfTamriel = {
  id: "01a0d5e3-fde4-7f22-a971-9f198603afa5",
  type: "page-type/temper-lore-book",
  slug: "wayshrines-of-tamriel",
  title: "Wayshrines of Tamriel",
  collection: "temper-lore-collection/magic-and-magicka",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
