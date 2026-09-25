import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const goldCoastGoblinTribes = {
  id: "01a0d5f7-73fa-7e10-bd47-fb8906682689",
  type: "page-type/temper-lore-book",
  slug: "gold-coast-goblin-tribes",
  title: "Gold Coast Goblin Tribes",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3702,
  bookIndex: 73,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 29, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
