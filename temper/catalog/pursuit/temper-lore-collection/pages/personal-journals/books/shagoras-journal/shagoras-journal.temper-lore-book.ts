import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shagorasJournal = {
  id: "01a0d5f4-6f1b-78ef-ae31-be120237421a",
  type: "page-type/temper-lore-book",
  slug: "shagoras-journal",
  title: "Shagora's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1748,
  bookIndex: 66,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
