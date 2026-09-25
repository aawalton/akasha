import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const benevolentNecromancyItExists = {
  id: "01a0d5f6-6d3f-7242-83de-2f3a85b5901a",
  type: "page-type/temper-lore-book",
  slug: "benevolent-necromancy-it-exists",
  title: "Benevolent Necromancy, it Exists",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 5718,
  bookIndex: 88,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 36, mapCount: 1 },
    { mapId: 1555, mapCount: 1 },
  ],
  positions: "jsonl",
} as const satisfies TemperLoreBook
