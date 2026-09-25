import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const searchInstructions = {
  id: "01a0d60d-ff6a-776a-896d-b37b954dd729",
  type: "page-type/temper-lore-book",
  slug: "search-instructions",
  title: "Search Instructions",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8521,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
