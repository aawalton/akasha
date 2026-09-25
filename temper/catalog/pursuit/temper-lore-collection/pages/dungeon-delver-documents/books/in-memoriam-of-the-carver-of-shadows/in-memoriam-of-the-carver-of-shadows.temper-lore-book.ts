import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inMemoriamOfTheCarverOfShadows = {
  id: "01a0d60d-708d-7367-ab42-edd736e45fb2",
  type: "page-type/temper-lore-book",
  slug: "in-memoriam-of-the-carver-of-shadows",
  title: "In Memoriam of the Carver of Shadows",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8091,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
