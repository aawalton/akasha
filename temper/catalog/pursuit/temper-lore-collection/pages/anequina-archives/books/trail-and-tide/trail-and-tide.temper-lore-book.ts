import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const trailAndTide = {
  id: "01a0d60b-2346-7dba-bca9-68623d824be1",
  type: "page-type/temper-lore-book",
  slug: "trail-and-tide",
  title: "Trail and Tide",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5380,
  bookIndex: 42,
  charted: true,
  onBookshelves: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
