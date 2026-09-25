import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yourFinalChance = {
  id: "01a0d5f1-f452-7b8f-9f0e-ee63b2573787",
  type: "page-type/temper-lore-book",
  slug: "your-final-chance",
  title: "Your Final Chance",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1743,
  bookIndex: 66,
  charted: true,
  quest: 4629,
  positions: "jsonl",
} as const satisfies TemperLoreBook
