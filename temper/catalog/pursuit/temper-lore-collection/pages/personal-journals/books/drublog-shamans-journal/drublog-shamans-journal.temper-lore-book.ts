import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const drublogShamansJournal = {
  id: "01a0d5f4-6f1a-77dc-bafb-f81feb83cac4",
  type: "page-type/temper-lore-book",
  slug: "drublog-shamans-journal",
  title: "Drublog Shaman's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 396,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
