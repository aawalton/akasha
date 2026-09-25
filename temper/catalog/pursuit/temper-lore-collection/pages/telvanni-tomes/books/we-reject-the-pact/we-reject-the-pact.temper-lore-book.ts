import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const weRejectThePact = {
  id: "01a0d60c-eb9c-74d8-90e4-d7c32e67f80d",
  type: "page-type/temper-lore-book",
  slug: "we-reject-the-pact",
  title: "We Reject the Pact",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7441,
  bookIndex: 51,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2274, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
