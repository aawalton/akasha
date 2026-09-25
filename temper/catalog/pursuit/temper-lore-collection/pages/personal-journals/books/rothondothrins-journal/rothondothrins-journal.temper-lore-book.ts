import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rothondothrinsJournal = {
  id: "01a0d5f4-6f1b-7cf3-b2ef-ea0471a6afd8",
  type: "page-type/temper-lore-book",
  slug: "rothondothrins-journal",
  title: "Rothondothrin's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 641,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
