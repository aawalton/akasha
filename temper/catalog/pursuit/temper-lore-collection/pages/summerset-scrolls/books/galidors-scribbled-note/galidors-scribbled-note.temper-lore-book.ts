import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const galidorsScribbledNote = {
  id: "01a0d60a-d5bc-71e3-8303-e467fe1411f7",
  type: "page-type/temper-lore-book",
  slug: "galidors-scribbled-note",
  title: "Galidor's Scribbled Note",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4716,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
