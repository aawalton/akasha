import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const varietiesOfFaithSolstice = {
  id: "01a0d60d-ff6a-795f-87f6-32e8afe2d3b9",
  type: "page-type/temper-lore-book",
  slug: "varieties-of-faith-solstice",
  title: "Varieties of Faith: Solstice",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8236,
  bookIndex: 50,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2603, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
