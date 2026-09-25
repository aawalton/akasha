import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const julianNotes = {
  id: "01a0d60d-9a63-72b2-8ea5-2c042482b01b",
  type: "page-type/temper-lore-book",
  slug: "julian-notes",
  title: "Julian Notes",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8202,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
