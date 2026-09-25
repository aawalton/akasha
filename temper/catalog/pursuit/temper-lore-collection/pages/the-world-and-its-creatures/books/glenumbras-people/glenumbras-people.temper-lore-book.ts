import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const glenumbrasPeople = {
  id: "01a0d5f5-f3e3-7df8-80af-17b1bf5722cc",
  type: "page-type/temper-lore-book",
  slug: "glenumbras-people",
  title: "Glenumbra's People",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 755,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
