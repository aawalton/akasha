import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlossomsOfMaelmoth = {
  id: "01a0d60b-8109-790a-a3b4-4a3d4a9684d1",
  type: "page-type/temper-lore-book",
  slug: "the-blossoms-of-maelmoth",
  title: "The Blossoms of Maelmoth",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6012,
  bookIndex: 72,
  charted: true,
  quest: 6510,
  positions: "jsonl",
} as const satisfies TemperLoreBook
