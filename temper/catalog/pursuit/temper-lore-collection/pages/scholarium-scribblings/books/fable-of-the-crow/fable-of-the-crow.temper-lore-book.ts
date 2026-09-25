import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fableOfTheCrow = {
  id: "01a0d60d-9a63-7466-b207-d9048ca633ee",
  type: "page-type/temper-lore-book",
  slug: "fable-of-the-crow",
  title: "Fable of the Crow",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8096,
  bookIndex: 64,
  charted: true,
  quest: 7220,
  positions: "jsonl",
} as const satisfies TemperLoreBook
