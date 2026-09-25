import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sagaOfVarensRebellionPart1 = {
  id: "01a0d60d-4ab0-7f43-838c-a8beb68572b6",
  type: "page-type/temper-lore-book",
  slug: "saga-of-varens-rebellion-part-1",
  title: "Saga of Varen's Rebellion, Part 1",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7796,
  bookIndex: 11,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
