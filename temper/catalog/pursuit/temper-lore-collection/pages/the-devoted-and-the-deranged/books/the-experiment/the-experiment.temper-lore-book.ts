import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theExperiment = {
  id: "01a0d5f5-abba-7ac5-a8ac-c0b9a040c000",
  type: "page-type/temper-lore-book",
  slug: "the-experiment",
  title: "The Experiment",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 594,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
