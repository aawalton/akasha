import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const achievingHarmonyWithDeath = {
  id: "01a0d5f6-6d3f-71a7-9b72-22ceae6016d4",
  type: "page-type/temper-lore-book",
  slug: "achieving-harmony-with-death",
  title: "Achieving Harmony with Death",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 5733,
  bookIndex: 87,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 37, mapCount: 2 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
