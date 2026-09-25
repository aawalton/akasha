import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const improvedCataclystModel = {
  id: "01a0d60c-40c0-7368-9eba-d1b2888ff5f9",
  type: "page-type/temper-lore-book",
  slug: "improved-cataclyst-model",
  title: "Improved Cataclyst Model",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6748,
  bookIndex: 15,
  charted: true,
  quest: 6699,
  positions: "jsonl",
} as const satisfies TemperLoreBook
