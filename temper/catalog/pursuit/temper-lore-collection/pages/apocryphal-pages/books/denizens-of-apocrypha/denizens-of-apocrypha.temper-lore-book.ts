import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const denizensOfApocrypha = {
  id: "01a0d60d-156d-7e28-8378-e17f9ce9bc2c",
  type: "page-type/temper-lore-book",
  slug: "denizens-of-apocrypha",
  title: "Denizens of Apocrypha",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7448,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
