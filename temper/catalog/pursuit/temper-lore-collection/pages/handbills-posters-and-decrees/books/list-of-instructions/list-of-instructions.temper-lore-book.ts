import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const listOfInstructions = {
  id: "01a0d5f2-83a2-712c-8726-f5e2bb6a79f1",
  type: "page-type/temper-lore-book",
  slug: "list-of-instructions",
  title: "List of Instructions",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1368,
  bookIndex: 58,
  charted: true,
  quest: 3791,
  positions: "jsonl",
} as const satisfies TemperLoreBook
