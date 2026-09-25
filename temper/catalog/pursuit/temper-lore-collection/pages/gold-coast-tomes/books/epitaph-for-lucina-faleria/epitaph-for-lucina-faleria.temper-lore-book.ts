import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const epitaphForLucinaFaleria = {
  id: "01a0d5f7-73f9-7518-a622-5551107e6035",
  type: "page-type/temper-lore-book",
  slug: "epitaph-for-lucina-faleria",
  title: "Epitaph for Lucina Faleria",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3672,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
