import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chewedNote = {
  id: "01a0d5f7-73f9-7889-851a-b423465f9416",
  type: "page-type/temper-lore-book",
  slug: "chewed-note",
  title: "Chewed Note",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3607,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
