import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aReportOnTheDusksabers = {
  id: "01a0d60c-eb9a-715f-a2ea-bd7f8c2717f4",
  type: "page-type/temper-lore-book",
  slug: "a-report-on-the-dusksabers",
  title: "A Report on the Dusksabers",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7424,
  bookIndex: 21,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2274, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
