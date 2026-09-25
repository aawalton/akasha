import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inMemoriamOfTheSaltSpray = {
  id: "01a0d60d-708d-741c-8701-8a78a20b15d3",
  type: "page-type/temper-lore-book",
  slug: "in-memoriam-of-the-salt-spray",
  title: "In Memoriam of the Salt Spray",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8094,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
