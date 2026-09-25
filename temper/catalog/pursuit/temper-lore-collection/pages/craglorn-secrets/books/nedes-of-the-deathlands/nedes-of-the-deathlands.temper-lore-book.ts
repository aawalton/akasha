import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nedesOfTheDeathlands = {
  id: "01a0d5f1-c91b-7876-964f-354ef21bbd47",
  type: "page-type/temper-lore-book",
  slug: "nedes-of-the-deathlands",
  title: "Nedes of the Deathlands",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2586,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
