import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chestOfCondemnation = {
  id: "01a0d60a-f1ec-78d6-ad5c-c3cb322debf1",
  type: "page-type/temper-lore-book",
  slug: "chest-of-condemnation",
  title: "Chest of Condemnation",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4822,
  bookIndex: 8,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
