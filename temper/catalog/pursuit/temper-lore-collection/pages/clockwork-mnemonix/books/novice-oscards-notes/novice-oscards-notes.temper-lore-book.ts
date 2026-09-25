import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noviceOscardsNotes = {
  id: "01a0d60a-a213-7b3a-b5dd-a02d1cb5012c",
  type: "page-type/temper-lore-book",
  slug: "novice-oscards-notes",
  title: "Novice Oscard's Notes",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4606,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
