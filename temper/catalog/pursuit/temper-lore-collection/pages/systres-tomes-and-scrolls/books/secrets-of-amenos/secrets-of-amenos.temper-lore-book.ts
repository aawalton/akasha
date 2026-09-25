import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const secretsOfAmenos = {
  id: "01a0d60c-75b6-7d10-960e-5563586d2c52",
  type: "page-type/temper-lore-book",
  slug: "secrets-of-amenos",
  title: "Secrets of Amenos",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7270,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
