import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromCaptainDunveril = {
  id: "01a0d5f3-7053-72b9-b7f8-32772631d49e",
  type: "page-type/temper-lore-book",
  slug: "note-from-captain-dunveril",
  title: "Note from Captain Dunveril",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 334,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
