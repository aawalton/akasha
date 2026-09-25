import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const defacedNedicPrayerBook = {
  id: "01a0d5f1-c91a-7102-bab7-f49c4ecda4a0",
  type: "page-type/temper-lore-book",
  slug: "defaced-nedic-prayer-book",
  title: "Defaced Nedic Prayer Book",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2565,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
