import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const relicsOfSaintVeloth = {
  id: "01a0d5f3-3fdb-76f5-b0ee-d6bbf46da65f",
  type: "page-type/temper-lore-book",
  slug: "relics-of-saint-veloth",
  title: "Relics of Saint Veloth",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1037,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
