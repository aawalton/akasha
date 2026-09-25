import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSerpentsBlade = {
  id: "01a0d5f1-c91b-714f-b8ad-29e83c65f741",
  type: "page-type/temper-lore-book",
  slug: "the-serpents-blade",
  title: "The Serpent's Blade",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2699,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
