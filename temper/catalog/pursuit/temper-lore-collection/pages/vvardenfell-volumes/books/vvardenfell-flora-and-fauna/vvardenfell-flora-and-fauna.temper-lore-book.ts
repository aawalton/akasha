import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vvardenfellFloraAndFauna = {
  id: "01a0d5f7-aa9a-7999-b683-cb2e257a6e38",
  type: "page-type/temper-lore-book",
  slug: "vvardenfell-flora-and-fauna",
  title: "Vvardenfell Flora and Fauna",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4538,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
