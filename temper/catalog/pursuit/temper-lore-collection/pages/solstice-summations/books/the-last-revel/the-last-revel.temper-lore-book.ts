import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLastRevel = {
  id: "01a0d60d-ff6a-78a0-afff-e5e15e4faad4",
  type: "page-type/temper-lore-book",
  slug: "the-last-revel",
  title: "The Last Revel",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8292,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
