import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const livesOfTheSaints = {
  id: "01a0d5f5-abba-78ef-8843-58dd4815207b",
  type: "page-type/temper-lore-book",
  slug: "lives-of-the-saints",
  title: "Lives of the Saints",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 827,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
