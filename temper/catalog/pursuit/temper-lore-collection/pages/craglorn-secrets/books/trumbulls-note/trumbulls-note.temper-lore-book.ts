import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const trumbullsNote = {
  id: "01a0d5f1-c91b-79b6-a543-b155f3dae8cd",
  type: "page-type/temper-lore-book",
  slug: "trumbulls-note",
  title: "Trumbull's Note",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2614,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
