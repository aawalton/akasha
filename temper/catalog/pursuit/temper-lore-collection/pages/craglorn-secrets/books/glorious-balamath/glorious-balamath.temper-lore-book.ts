import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gloriousBalamath = {
  id: "01a0d5f1-c91a-7453-8067-291e2f91af1c",
  type: "page-type/temper-lore-book",
  slug: "glorious-balamath",
  title: "Glorious Balamath",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2616,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
