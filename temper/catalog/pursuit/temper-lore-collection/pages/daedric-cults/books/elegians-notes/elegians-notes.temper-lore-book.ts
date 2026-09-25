import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const elegiansNotes = {
  id: "01a0d5f2-253a-7f0c-afde-f5aee7cc2f3b",
  type: "page-type/temper-lore-book",
  slug: "elegians-notes",
  title: "Elegian's Notes",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 6819,
  charted: true,
  quest: 6701,
  positions: "jsonl",
} as const satisfies TemperLoreBook
