import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const modernHeretics = {
  id: "01a0d5e3-6b61-7e32-9ad9-bfa68840ad7b",
  type: "page-type/temper-lore-book",
  slug: "modern-heretics",
  title: "Modern Heretics",
  collection: "temper-lore-collection/daedric-princes",
  bookIndex: 6,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
