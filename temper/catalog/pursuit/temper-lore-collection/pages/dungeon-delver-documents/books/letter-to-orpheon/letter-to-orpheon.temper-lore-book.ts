import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToOrpheon = {
  id: "01a0d60d-708e-7700-8669-3d2d3bab64b0",
  type: "page-type/temper-lore-book",
  slug: "letter-to-orpheon",
  title: "Letter to Orpheon",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8179,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
