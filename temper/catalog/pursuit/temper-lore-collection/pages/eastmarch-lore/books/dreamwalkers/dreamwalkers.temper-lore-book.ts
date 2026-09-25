import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dreamwalkers = {
  id: "01a0d5e4-88db-7670-a947-eb9a388a4a83",
  type: "page-type/temper-lore-book",
  slug: "dreamwalkers",
  title: "Dreamwalkers",
  collection: "temper-lore-collection/eastmarch-lore",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
