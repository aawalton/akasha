import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aGuideToTheDeadlands = {
  id: "01a0d60c-40bf-712e-a55f-9ffa83dea071",
  type: "page-type/temper-lore-book",
  slug: "a-guide-to-the-deadlands",
  title: "A Guide to the Deadlands",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6594,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
