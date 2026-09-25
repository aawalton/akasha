import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aWorldOfCorpses = {
  id: "01a0d5f6-6d3f-7a99-b2cd-9aea15d6bb41",
  type: "page-type/temper-lore-book",
  slug: "a-world-of-corpses",
  title: "A World of Corpses",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 5719,
  bookIndex: 89,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 36, mapCount: 2 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
