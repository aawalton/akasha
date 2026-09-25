import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const interceptedStarGazersDocument = {
  id: "01a0d5f1-c91a-719a-afd5-3572be6b61f0",
  type: "page-type/temper-lore-book",
  slug: "intercepted-star-gazers-document",
  title: "Intercepted Star-Gazer's Document",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2735,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
