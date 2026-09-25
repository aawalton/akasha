import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const senansNote = {
  id: "01a0d60b-c958-76b6-a74f-3030d52c16a4",
  type: "page-type/temper-lore-book",
  slug: "senans-note",
  title: "Senan's Note",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6237,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
