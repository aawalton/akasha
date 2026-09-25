import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMythOfTheSeaSloads = {
  id: "01a0d60a-d5be-7d4f-abfe-292ae806cf7a",
  type: "page-type/temper-lore-book",
  slug: "the-myth-of-the-sea-sloads",
  title: "The Myth of the Sea Sloads",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5108,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 32, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
