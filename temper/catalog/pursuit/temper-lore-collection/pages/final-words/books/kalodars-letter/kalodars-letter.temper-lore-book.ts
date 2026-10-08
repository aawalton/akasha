import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kalodarsLetter = {
  id: "01a0d5f6-45ad-7514-9e2e-0b07e1f7e4b1",
  type: "page-type/temper-lore-book",
  slug: "kalodars-letter",
  title: "Kalodar's Letter",
  collection: "temper-lore-collection/final-words",
  esoBookId: 996,
  bookIndex: 19,
  charted: true,
  quest: 4448,
  positions: "jsonl",
  createdAt: "2026-09-25T00:28:01.837Z",
  updatedAt: "2026-09-25T00:28:03.000Z",
} as const satisfies TemperLoreBook
