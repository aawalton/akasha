import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ardentFlameDraconicOrEndemic = {
  id: "01a0d5f6-6d3f-7eb8-8095-60b23a4f1b2f",
  type: "page-type/temper-lore-book",
  slug: "ardent-flame-draconic-or-endemic",
  title: "Ardent Flame: Draconic or Endemic?",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 2389,
  bookIndex: 51,
  charted: true,
  onBookshelves: true,
  mapCounts: [
    { mapId: 20, mapCount: 50 },
    { mapId: 27, mapCount: 5 },
    { mapId: 125, mapCount: 13 },
    { mapId: 256, mapCount: 31 },
    { mapId: 1126, mapCount: 8 },
  ],
} as const satisfies TemperLoreBook
