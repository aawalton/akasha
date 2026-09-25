import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bolgasGuideToIslandBeasts = {
  id: "01a0d5f5-f3e3-71c5-a6a8-bab2d29c66ce",
  type: "page-type/temper-lore-book",
  slug: "bolgas-guide-to-island-beasts",
  title: "Bolga's Guide to Island Beasts",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1582,
  bookIndex: 41,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
