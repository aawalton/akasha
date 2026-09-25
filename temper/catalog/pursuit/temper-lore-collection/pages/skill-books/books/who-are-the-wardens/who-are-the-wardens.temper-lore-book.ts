import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whoAreTheWardens = {
  id: "01a0d5f6-6d42-723e-8a0a-68ad933f4662",
  type: "page-type/temper-lore-book",
  slug: "who-are-the-wardens",
  title: "Who Are the Wardens?",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 4592,
  bookIndex: 84,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 30, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
