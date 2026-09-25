import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tenderclaw = {
  id: "01a0d60b-8109-7927-862a-d9196b91c061",
  type: "page-type/temper-lore-book",
  slug: "tenderclaw",
  title: "Tenderclaw",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5905,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
