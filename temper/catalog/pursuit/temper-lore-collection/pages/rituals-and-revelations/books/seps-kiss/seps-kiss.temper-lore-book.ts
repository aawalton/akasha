import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sepsKiss = {
  id: "01a0d5f5-444c-7677-b97d-60ce8dfc7bfe",
  type: "page-type/temper-lore-book",
  slug: "seps-kiss",
  title: "Sep's Kiss",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 713,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
