import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const harvestsEnd = {
  id: "01a0d5f3-3fda-776b-a807-89b425f5dfdd",
  type: "page-type/temper-lore-book",
  slug: "harvests-end",
  title: "Harvest's End",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1819,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
