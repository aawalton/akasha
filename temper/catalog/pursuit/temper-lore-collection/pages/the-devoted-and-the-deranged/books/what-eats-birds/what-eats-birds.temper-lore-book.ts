import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whatEatsBirds = {
  id: "01a0d5f5-abbb-7b85-b055-e12741f1c941",
  type: "page-type/temper-lore-book",
  slug: "what-eats-birds",
  title: "What Eats Birds?",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1563,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
