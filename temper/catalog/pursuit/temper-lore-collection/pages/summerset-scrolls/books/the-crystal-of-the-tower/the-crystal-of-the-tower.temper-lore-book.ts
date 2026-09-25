import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theCrystalOfTheTower = {
  id: "01a0d60a-d5bd-7c2a-b20c-9ca8421a4795",
  type: "page-type/temper-lore-book",
  slug: "the-crystal-of-the-tower",
  title: "The Crystal of the Tower",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5109,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 32, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
