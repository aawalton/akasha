import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inMemoryOfTheBraveSouls = {
  id: "01a0d60c-75b5-7986-95ba-7fbed701d368",
  type: "page-type/temper-lore-book",
  slug: "in-memory-of-the-brave-souls",
  title: "In Memory of the Brave Souls",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7154,
  bookIndex: 17,
  charted: true,
  quest: 6796,
  positions: "jsonl",
} as const satisfies TemperLoreBook
