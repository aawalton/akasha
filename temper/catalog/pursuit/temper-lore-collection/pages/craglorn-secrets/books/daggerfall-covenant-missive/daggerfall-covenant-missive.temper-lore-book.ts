import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const daggerfallCovenantMissive = {
  id: "01a0d5f1-c91a-7a20-937f-870b7706da2b",
  type: "page-type/temper-lore-book",
  slug: "daggerfall-covenant-missive",
  title: "Daggerfall Covenant Missive",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2425,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
