import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ateianFife = {
  id: "01a0d60b-8107-73cc-ab54-12dfe865fa17",
  type: "page-type/temper-lore-book",
  slug: "ateian-fife",
  title: "Ateian Fife",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6102,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
