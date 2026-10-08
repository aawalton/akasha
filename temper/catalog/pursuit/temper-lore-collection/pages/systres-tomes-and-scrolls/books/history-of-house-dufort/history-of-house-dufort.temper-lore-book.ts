import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const historyOfHouseDufort = {
  id: "01a0d60c-75b5-7ce1-a9a4-030a5074d28a",
  type: "page-type/temper-lore-book",
  slug: "history-of-house-dufort",
  title: "History of House Dufort",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7130,
  bookIndex: 71,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2114, mapFlagged: true }],
  positions: "jsonl",
  createdAt: "2026-09-25T00:52:15.925Z",
  updatedAt: "2026-09-25T00:52:18.000Z",
} as const satisfies TemperLoreBook
