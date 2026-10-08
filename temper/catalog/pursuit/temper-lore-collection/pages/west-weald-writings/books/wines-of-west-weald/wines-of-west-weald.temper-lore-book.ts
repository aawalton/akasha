import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const winesOfWestWeald = {
  id: "01a0d60d-4ab1-7fd6-bf1b-887ce90e464e",
  type: "page-type/temper-lore-book",
  slug: "wines-of-west-weald",
  title: "Wines of West Weald",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7779,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:53:10.449Z",
  updatedAt: "2026-09-25T00:53:12.000Z",
} as const satisfies TemperLoreBook
