import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const itLives = {
  id: "01a0d5f1-c91a-7ada-a11a-b74c62443238",
  type: "page-type/temper-lore-book",
  slug: "it-lives",
  title: "It Lives!",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2658,
  bookIndex: 58,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
