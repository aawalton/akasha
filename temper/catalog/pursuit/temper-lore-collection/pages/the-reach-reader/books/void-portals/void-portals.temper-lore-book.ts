import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const voidPortals = {
  id: "01a0d60b-c958-7767-becc-f4cba07b0552",
  type: "page-type/temper-lore-book",
  slug: "void-portals",
  title: "Void Portals",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6251,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
