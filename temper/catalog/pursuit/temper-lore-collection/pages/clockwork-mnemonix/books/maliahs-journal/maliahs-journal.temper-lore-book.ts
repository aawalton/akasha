import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const maliahsJournal = {
  id: "01a0d60a-a213-7b8e-b361-ba82e3713d88",
  type: "page-type/temper-lore-book",
  slug: "maliahs-journal",
  title: "Maliah's Journal",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4613,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
