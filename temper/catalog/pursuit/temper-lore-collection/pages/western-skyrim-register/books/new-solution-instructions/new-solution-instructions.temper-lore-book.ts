import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const newSolutionInstructions = {
  id: "01a0d60b-a362-753f-a240-ad35a83bc560",
  type: "page-type/temper-lore-book",
  slug: "new-solution-instructions",
  title: "New Solution Instructions",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 5927,
  bookIndex: 3,
  charted: true,
  quest: 6484,
  positions: "jsonl",
} as const satisfies TemperLoreBook
