import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thibautsCairnAndItsHistory = {
  id: "01a0d5f5-f3e5-743f-815b-5c8e7fbfbc97",
  type: "page-type/temper-lore-book",
  slug: "thibauts-cairn-and-its-history",
  title: "Thibaut's Cairn and its History",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1953,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
