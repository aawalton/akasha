import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aSmugglersPlan = {
  id: "01a0d5f1-f450-7fcc-8f79-bde8c6f1630b",
  type: "page-type/temper-lore-book",
  slug: "a-smugglers-plan",
  title: "A Smuggler's Plan",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 2073,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
