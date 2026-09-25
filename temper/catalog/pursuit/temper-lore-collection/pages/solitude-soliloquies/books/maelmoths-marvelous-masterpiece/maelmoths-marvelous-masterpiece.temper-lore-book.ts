import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const maelmothsMarvelousMasterpiece = {
  id: "01a0d60b-8108-7193-ae5b-767085e553fb",
  type: "page-type/temper-lore-book",
  slug: "maelmoths-marvelous-masterpiece",
  title: "Maelmoth's Marvelous Masterpiece",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6219,
  bookIndex: 74,
  charted: true,
  quest: 6510,
  positions: "jsonl",
} as const satisfies TemperLoreBook
