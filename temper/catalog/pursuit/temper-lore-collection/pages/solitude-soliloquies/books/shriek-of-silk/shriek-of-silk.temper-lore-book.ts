import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shriekOfSilk = {
  id: "01a0d60b-8109-7c41-be2d-4d1da89d4f5f",
  type: "page-type/temper-lore-book",
  slug: "shriek-of-silk",
  title: "Shriek-of-Silk",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6103,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
