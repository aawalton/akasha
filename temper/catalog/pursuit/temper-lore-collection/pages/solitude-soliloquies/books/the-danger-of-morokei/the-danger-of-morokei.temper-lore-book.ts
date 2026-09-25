import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theDangerOfMorokei = {
  id: "01a0d60b-8109-70e0-953b-b5ef66be3093",
  type: "page-type/temper-lore-book",
  slug: "the-danger-of-morokei",
  title: "The Danger of Morokei",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5941,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
