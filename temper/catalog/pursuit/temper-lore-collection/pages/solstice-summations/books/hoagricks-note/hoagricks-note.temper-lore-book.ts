import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hoagricksNote = {
  id: "01a0d60d-ff69-7959-8d92-fe2dca995fdb",
  type: "page-type/temper-lore-book",
  slug: "hoagricks-note",
  title: "Hoagrick's Note",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8542,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
