import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const woodhearthAPocketGuide = {
  id: "01a0d5e4-ec69-7f9a-a9d9-b5450912951c",
  type: "page-type/temper-lore-book",
  slug: "woodhearth-a-pocket-guide",
  title: "Woodhearth: A Pocket Guide",
  collection: "temper-lore-collection/greenshade-lore",
  bookIndex: 6,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
