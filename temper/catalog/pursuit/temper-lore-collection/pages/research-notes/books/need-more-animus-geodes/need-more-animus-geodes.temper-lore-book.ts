import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const needMoreAnimusGeodes = {
  id: "01a0d5f5-1385-7f05-a307-e37f81395d2e",
  type: "page-type/temper-lore-book",
  slug: "need-more-animus-geodes",
  title: "Need More Animus Geodes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1597,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
