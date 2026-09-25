import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSerpentsSong = {
  id: "01a0d5f1-c91b-7633-a707-7e9d0cf26d34",
  type: "page-type/temper-lore-book",
  slug: "the-serpents-song",
  title: "The Serpent's Song",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2694,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
