import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const contractorsNote = {
  id: "01a0d5f7-73f9-7db3-a59e-f54ddd55e27e",
  type: "page-type/temper-lore-book",
  slug: "contractors-note",
  title: "Contractor's Note",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3640,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
