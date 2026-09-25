import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const huvarsJournal = {
  id: "01a0d5f4-6f1a-7f0e-b761-8fb6a7021fe0",
  type: "page-type/temper-lore-book",
  slug: "huvars-journal",
  title: "Huvar's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 194,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
