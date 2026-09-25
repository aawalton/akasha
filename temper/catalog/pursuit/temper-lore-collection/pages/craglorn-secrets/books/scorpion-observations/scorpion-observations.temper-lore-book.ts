import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scorpionObservations = {
  id: "01a0d5f1-c91b-77a0-8059-76c357baac64",
  type: "page-type/temper-lore-book",
  slug: "scorpion-observations",
  title: "Scorpion Observations",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2709,
  bookIndex: 88,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
