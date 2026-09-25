import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToAriana = {
  id: "01a0d5f1-c91a-70b7-8986-02f65182b4de",
  type: "page-type/temper-lore-book",
  slug: "letter-to-ariana",
  title: "Letter to Ariana",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2742,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
