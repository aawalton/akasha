import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const peryitesSalvation = {
  id: "01a0d60c-eb9c-7ec8-921e-7d5fbc4018a3",
  type: "page-type/temper-lore-book",
  slug: "peryites-salvation",
  title: "Peryite's Salvation",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7425,
  bookIndex: 31,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2274, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
