import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const backToTheLand = {
  id: "01a0d5f6-45ad-7461-a188-3c9e37eca2fe",
  type: "page-type/temper-lore-book",
  slug: "back-to-the-land",
  title: "Back to the Land!",
  collection: "temper-lore-collection/final-words",
  esoBookId: 2069,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
