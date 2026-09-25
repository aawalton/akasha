import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thingsMyGreatGranSaid = {
  id: "01a0d60b-8109-7cad-956c-2a965eeaa860",
  type: "page-type/temper-lore-book",
  slug: "things-my-great-gran-said",
  title: "Things My Great-Gran Said",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5952,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
