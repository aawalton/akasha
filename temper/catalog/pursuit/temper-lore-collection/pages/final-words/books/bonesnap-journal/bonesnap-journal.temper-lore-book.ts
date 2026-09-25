import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bonesnapJournal = {
  id: "01a0d5f6-45ad-7638-9564-2a35dec391fc",
  type: "page-type/temper-lore-book",
  slug: "bonesnap-journal",
  title: "Bonesnap Journal",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1867,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
