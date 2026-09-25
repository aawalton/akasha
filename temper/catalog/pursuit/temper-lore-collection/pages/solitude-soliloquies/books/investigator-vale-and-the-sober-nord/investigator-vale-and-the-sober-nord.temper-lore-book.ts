import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const investigatorValeAndTheSoberNord = {
  id: "01a0d60b-8108-7c5f-92d7-7dd154e69a02",
  type: "page-type/temper-lore-book",
  slug: "investigator-vale-and-the-sober-nord",
  title: "Investigator Vale and the Sober Nord",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6232,
  bookIndex: 54,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 24, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
