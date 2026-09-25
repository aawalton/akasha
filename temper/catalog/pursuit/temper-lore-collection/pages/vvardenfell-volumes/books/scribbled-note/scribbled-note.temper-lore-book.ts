import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scribbledNote = {
  id: "01a0d5f7-aa99-7d3b-aafa-4df99944424c",
  type: "page-type/temper-lore-book",
  slug: "scribbled-note",
  title: "Scribbled Note",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4428,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
