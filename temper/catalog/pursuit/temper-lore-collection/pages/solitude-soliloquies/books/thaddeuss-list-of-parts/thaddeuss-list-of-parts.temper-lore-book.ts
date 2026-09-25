import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thaddeussListOfParts = {
  id: "01a0d60b-8109-7db4-ae22-dd6da92ce990",
  type: "page-type/temper-lore-book",
  slug: "thaddeuss-list-of-parts",
  title: "Thaddeus's List of Parts",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5935,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
