import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const correspondenceFromTorvesard = {
  id: "01a0d60c-eb9b-7398-baf7-b3d231485c94",
  type: "page-type/temper-lore-book",
  slug: "correspondence-from-torvesard",
  title: "Correspondence from Torvesard",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7606,
  bookIndex: 15,
  charted: true,
  quest: 6973,
  positions: "jsonl",
} as const satisfies TemperLoreBook
