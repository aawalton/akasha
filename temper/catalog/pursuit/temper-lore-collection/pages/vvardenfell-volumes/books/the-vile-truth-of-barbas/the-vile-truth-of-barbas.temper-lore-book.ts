import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theVileTruthOfBarbas = {
  id: "01a0d5f7-aa9a-7e53-8a4d-d6834d6589fc",
  type: "page-type/temper-lore-book",
  slug: "the-vile-truth-of-barbas",
  title: "The Vile Truth of Barbas",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4037,
  bookIndex: 74,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
