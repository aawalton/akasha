import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const investigatorValeInTheReach = {
  id: "01a0d60b-c958-7c36-97b1-ff98c85cac11",
  type: "page-type/temper-lore-book",
  slug: "investigator-vale-in-the-reach",
  title: "Investigator Vale in the Reach",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6397,
  bookIndex: 70,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 41, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
