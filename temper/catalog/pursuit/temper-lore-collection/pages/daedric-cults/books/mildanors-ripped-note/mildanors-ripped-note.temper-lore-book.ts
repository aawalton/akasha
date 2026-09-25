import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mildanorsRippedNote = {
  id: "01a0d5f2-253b-7354-b46f-d41ff74e5dc0",
  type: "page-type/temper-lore-book",
  slug: "mildanors-ripped-note",
  title: "Mildanor's Ripped Note",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 7509,
  charted: true,
  quest: 6967,
  positions: "jsonl",
} as const satisfies TemperLoreBook
