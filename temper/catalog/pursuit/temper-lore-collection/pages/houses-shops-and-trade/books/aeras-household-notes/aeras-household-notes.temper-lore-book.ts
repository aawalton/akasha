import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aerasHouseholdNotes = {
  id: "01a0d5f2-db25-7098-8c75-c999c45c92aa",
  type: "page-type/temper-lore-book",
  slug: "aeras-household-notes",
  title: "Aera's Household Notes",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 348,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
