import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aStarWalksInCraglorn = {
  id: "01a0d5f1-c919-766a-a128-3d04e84a2c2f",
  type: "page-type/temper-lore-book",
  slug: "a-star-walks-in-craglorn",
  title: "A Star Walks In Craglorn",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2690,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
