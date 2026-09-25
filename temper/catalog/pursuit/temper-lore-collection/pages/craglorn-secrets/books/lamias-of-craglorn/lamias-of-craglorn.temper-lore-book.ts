import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lamiasOfCraglorn = {
  id: "01a0d5f1-c91a-701a-85db-449971cb3ac6",
  type: "page-type/temper-lore-book",
  slug: "lamias-of-craglorn",
  title: "Lamias of Craglorn",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2428,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
