import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hiddenKindredInstructions = {
  id: "01a0d60c-eb9b-7ae5-9ef2-16862fe5d863",
  type: "page-type/temper-lore-book",
  slug: "hidden-kindred-instructions",
  title: "Hidden Kindred Instructions",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7585,
  bookIndex: 5,
  charted: true,
  quest: 6971,
  positions: "jsonl",
} as const satisfies TemperLoreBook
