import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aStarGazersRamblings = {
  id: "01a0d5f1-c919-7670-ba2b-59112a4901c4",
  type: "page-type/temper-lore-book",
  slug: "a-star-gazers-ramblings",
  title: "A Star-Gazer's Ramblings",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2427,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
