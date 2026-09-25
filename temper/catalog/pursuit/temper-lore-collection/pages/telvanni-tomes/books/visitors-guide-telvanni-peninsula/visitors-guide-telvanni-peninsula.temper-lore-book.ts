import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const visitorsGuideTelvanniPeninsula = {
  id: "01a0d60c-eb9c-72d2-9d7a-ab307f7362f5",
  type: "page-type/temper-lore-book",
  slug: "visitors-guide-telvanni-peninsula",
  title: "Visitor's Guide: Telvanni Peninsula",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7443,
  bookIndex: 53,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2274, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
