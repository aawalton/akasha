import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const remanIiTheLimitsOfAmbition = {
  id: "01a0d5f3-3fdb-7e45-94b9-a2b067e22c6b",
  type: "page-type/temper-lore-book",
  slug: "reman-ii-the-limits-of-ambition",
  title: "Reman II: The Limits of Ambition",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 5376,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 34, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
