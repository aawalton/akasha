import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legendOfTheYokudanChargers = {
  id: "01a0d5f5-f3e4-7048-a886-30884bf85537",
  type: "page-type/temper-lore-book",
  slug: "legend-of-the-yokudan-chargers",
  title: "Legend of the Yokudan Chargers",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1768,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
