import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scalySteedsOfBlackMarsh = {
  id: "01a0d5f6-a29a-7e31-af2b-5dd20b7b76c5",
  type: "page-type/temper-lore-book",
  slug: "scaly-steeds-of-black-marsh",
  title: "Scaly Steeds of Black Marsh",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5359,
  bookIndex: 55,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 34, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
