import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ferianDarkstorm = {
  id: "01a0d5f3-3fda-720d-9476-f487913b8d08",
  type: "page-type/temper-lore-book",
  slug: "ferian-darkstorm",
  title: "Ferian Darkstorm",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1115,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
