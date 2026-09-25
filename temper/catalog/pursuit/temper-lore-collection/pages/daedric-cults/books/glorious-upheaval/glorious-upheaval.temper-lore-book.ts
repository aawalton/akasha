import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gloriousUpheaval = {
  id: "01a0d5f2-253a-7afa-9f6b-4c479bb3139b",
  type: "page-type/temper-lore-book",
  slug: "glorious-upheaval",
  title: "Glorious Upheaval",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 2948,
  bookIndex: 80,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 26, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
