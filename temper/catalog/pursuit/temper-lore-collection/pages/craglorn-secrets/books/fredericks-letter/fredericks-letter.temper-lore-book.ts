import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fredericksLetter = {
  id: "01a0d5f1-c91a-7fb6-b93d-7896e5737a54",
  type: "page-type/temper-lore-book",
  slug: "fredericks-letter",
  title: "Frederick's Letter",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2610,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
