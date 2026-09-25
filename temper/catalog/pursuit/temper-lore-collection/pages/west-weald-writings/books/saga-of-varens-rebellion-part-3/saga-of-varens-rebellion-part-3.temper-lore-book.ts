import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sagaOfVarensRebellionPart3 = {
  id: "01a0d60d-4ab0-7ecb-a823-9887c679a606",
  type: "page-type/temper-lore-book",
  slug: "saga-of-varens-rebellion-part-3",
  title: "Saga of Varen's Rebellion, Part 3",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7798,
  bookIndex: 13,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
