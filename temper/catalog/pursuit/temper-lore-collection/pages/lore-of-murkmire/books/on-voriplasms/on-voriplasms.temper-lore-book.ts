import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onVoriplasms = {
  id: "01a0d5f6-a29a-79d2-b6ef-834fb4b5890c",
  type: "page-type/temper-lore-book",
  slug: "on-voriplasms",
  title: "On Voriplasms",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5304,
  bookIndex: 61,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 34, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
