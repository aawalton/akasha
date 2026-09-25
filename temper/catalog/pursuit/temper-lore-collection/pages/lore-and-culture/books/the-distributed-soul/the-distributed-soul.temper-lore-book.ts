import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDistributedSoul = {
  id: "01a0d5f3-3fdb-775d-bf46-a31b19faff28",
  type: "page-type/temper-lore-book",
  slug: "the-distributed-soul",
  title: "The Distributed Soul",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 2951,
  bookIndex: 99,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 26, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
