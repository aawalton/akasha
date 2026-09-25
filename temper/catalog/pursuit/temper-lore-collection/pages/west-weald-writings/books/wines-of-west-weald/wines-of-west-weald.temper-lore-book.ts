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
} as const satisfies TemperLoreBook
