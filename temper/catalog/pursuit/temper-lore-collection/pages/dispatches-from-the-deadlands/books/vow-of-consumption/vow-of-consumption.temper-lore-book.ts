import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vowOfConsumption = {
  id: "01a0d60c-40c1-7102-a63f-2e791b6d468e",
  type: "page-type/temper-lore-book",
  slug: "vow-of-consumption",
  title: "Vow of Consumption",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6768,
  bookIndex: 73,
  charted: true,
  quest: 6705,
  positions: "jsonl",
} as const satisfies TemperLoreBook
