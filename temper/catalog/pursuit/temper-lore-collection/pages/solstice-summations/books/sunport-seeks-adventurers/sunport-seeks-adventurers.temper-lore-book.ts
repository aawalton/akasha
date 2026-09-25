import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sunportSeeksAdventurers = {
  id: "01a0d60d-ff6a-79ef-95f7-6fa33d4ed329",
  type: "page-type/temper-lore-book",
  slug: "sunport-seeks-adventurers",
  title: "Sunport Seeks Adventurers!",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8245,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
