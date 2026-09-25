import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainsLogOfTheIntrepidGuar = {
  id: "01a0d60d-9a63-7000-b7c7-ec5ab12b3693",
  type: "page-type/temper-lore-book",
  slug: "captains-log-of-the-intrepid-guar",
  title: "Captain's Log of the Intrepid Guar",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8197,
  bookIndex: 29,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
