import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ourPunyAllies = {
  id: "01a0d60c-eb9c-7e51-a7a0-5d330b890d9b",
  type: "page-type/temper-lore-book",
  slug: "our-puny-allies",
  title: "Our Puny Allies",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7440,
  bookIndex: 34,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2274, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
