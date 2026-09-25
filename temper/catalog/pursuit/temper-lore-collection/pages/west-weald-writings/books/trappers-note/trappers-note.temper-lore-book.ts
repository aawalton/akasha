import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const trappersNote = {
  id: "01a0d60d-4ab0-785a-b314-b1863ab7f1a5",
  type: "page-type/temper-lore-book",
  slug: "trappers-note",
  title: "Trapper's Note",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8062,
  charted: true,
  quest: 7208,
  positions: "jsonl",
} as const satisfies TemperLoreBook
