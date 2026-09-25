import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const unknownExhumed = {
  id: "01a0d60b-8109-7bb7-ace3-10b89e7feddd",
  type: "page-type/temper-lore-book",
  slug: "unknown-exhumed",
  title: "Unknown (Exhumed)",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5741,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
