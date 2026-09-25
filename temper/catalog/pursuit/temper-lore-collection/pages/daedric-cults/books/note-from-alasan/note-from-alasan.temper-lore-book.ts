import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteFromAlasan = {
  id: "01a0d5f2-253b-7c32-b414-bc7d7969cc8c",
  type: "page-type/temper-lore-book",
  slug: "note-from-alasan",
  title: "Note from Alasan",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1546,
  bookIndex: 59,
  charted: true,
  quest: 2251,
  positions: "jsonl",
} as const satisfies TemperLoreBook
