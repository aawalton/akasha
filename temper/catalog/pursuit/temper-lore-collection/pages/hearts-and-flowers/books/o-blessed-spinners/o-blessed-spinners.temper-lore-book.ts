import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oBlessedSpinners = {
  id: "01a0d5f2-af70-79de-a706-3f5c60f61bfc",
  type: "page-type/temper-lore-book",
  slug: "o-blessed-spinners",
  title: "O Blessed Spinners",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 521,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
