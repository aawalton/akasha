import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const feronesInstructions = {
  id: "01a0d60c-75b5-793a-afb4-e169390eca7a",
  type: "page-type/temper-lore-book",
  slug: "ferones-instructions",
  title: "Ferone's Instructions",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7102,
  charted: true,
  quest: 6793,
  positions: "jsonl",
} as const satisfies TemperLoreBook
