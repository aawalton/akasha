import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blackcasterNotice = {
  id: "01a0d5f1-c919-7c36-8b25-0c4a2d062915",
  type: "page-type/temper-lore-book",
  slug: "blackcaster-notice",
  title: "Blackcaster Notice",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2608,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
