import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whatsAnArcanistPart2 = {
  id: "01a0d60c-eb9c-7dab-b537-863d6c86175b",
  type: "page-type/temper-lore-book",
  slug: "whats-an-arcanist-part-2",
  title: "What's an Arcanist? Part 2",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7459,
  bookIndex: 57,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2274, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
