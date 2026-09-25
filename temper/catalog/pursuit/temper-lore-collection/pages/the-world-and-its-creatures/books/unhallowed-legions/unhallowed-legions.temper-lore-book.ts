import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const unhallowedLegions = {
  id: "01a0d5f5-f3e5-7d2e-892d-c33f87b61c46",
  type: "page-type/temper-lore-book",
  slug: "unhallowed-legions",
  title: "Unhallowed Legions",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 2683,
  bookIndex: 77,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 26, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
