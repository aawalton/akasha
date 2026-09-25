import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aMothersLament = {
  id: "01a0d60d-708d-7af3-a018-f52d32cb2c1d",
  type: "page-type/temper-lore-book",
  slug: "a-mothers-lament",
  title: "A Mother's Lament",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8170,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
