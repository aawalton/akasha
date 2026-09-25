import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFallacyOfUndeath = {
  id: "01a0d60d-d472-7f03-86f7-9a70353ea9f4",
  type: "page-type/temper-lore-book",
  slug: "the-fallacy-of-undeath",
  title: "The Fallacy of Undeath",
  collection: "temper-lore-collection/elusive-manuscripts",
  esoBookId: 8468,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
