import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const irgnarsJournal = {
  id: "01a0d5f4-6f1a-77ea-9361-abace273826c",
  type: "page-type/temper-lore-book",
  slug: "irgnars-journal",
  title: "Irgnar's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 758,
  bookIndex: 29,
  charted: true,
  quest: 4178,
  positions: "jsonl",
  createdAt: "2026-09-25T00:26:01.370Z",
  updatedAt: "2026-09-25T00:26:13.000Z",
} as const satisfies TemperLoreBook
