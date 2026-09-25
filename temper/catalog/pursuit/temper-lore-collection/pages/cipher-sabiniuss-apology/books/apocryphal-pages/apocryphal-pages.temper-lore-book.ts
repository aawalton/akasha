import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const apocryphalPages = {
  id: "01a0d60e-aeee-75b4-9f56-59d869ba2f0b",
  type: "page-type/temper-lore-book",
  slug: "apocryphal-pages",
  title: "Apocryphal Pages",
  collection: "temper-lore-collection/cipher-sabiniuss-apology",
  esoBookId: 7597,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
