import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bleakrockFishermansJournal = {
  id: "01a0d5f4-6f1a-7618-b2e6-2f893461f0ef",
  type: "page-type/temper-lore-book",
  slug: "bleakrock-fishermans-journal",
  title: "Bleakrock Fisherman's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 146,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
