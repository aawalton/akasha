import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const secretOfTheTormentingEye = {
  id: "01a0d60d-156e-7aa0-a00a-3411cc8b6649",
  type: "page-type/temper-lore-book",
  slug: "secret-of-the-tormenting-eye",
  title: "Secret of the Tormenting Eye",
  collection: "temper-lore-collection/apocryphal-pages",
  esoBookId: 7652,
  bookIndex: 8,
  charted: true,
  quest: 6974,
  positions: "jsonl",
} as const satisfies TemperLoreBook
