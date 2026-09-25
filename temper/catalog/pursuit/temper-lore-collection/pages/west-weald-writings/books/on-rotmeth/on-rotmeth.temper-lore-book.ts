import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onRotmeth = {
  id: "01a0d60d-4ab0-76a8-b7ef-9e019356f80b",
  type: "page-type/temper-lore-book",
  slug: "on-rotmeth",
  title: "On Rotmeth",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7808,
  bookIndex: 94,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
