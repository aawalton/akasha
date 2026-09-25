import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tonightWasTheNight = {
  id: "01a0d5f2-af71-7af0-9d25-b2f109a2f1b3",
  type: "page-type/temper-lore-book",
  slug: "tonight-was-the-night",
  title: "Tonight Was the Night",
  collection: "temper-lore-collection/hearts-and-flowers",
  esoBookId: 1974,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
