import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inMemoriamOfTheAshyWind = {
  id: "01a0d60d-708d-7d70-a62f-10d0e5cf2bbf",
  type: "page-type/temper-lore-book",
  slug: "in-memoriam-of-the-ashy-wind",
  title: "In Memoriam of the Ashy Wind",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8095,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
