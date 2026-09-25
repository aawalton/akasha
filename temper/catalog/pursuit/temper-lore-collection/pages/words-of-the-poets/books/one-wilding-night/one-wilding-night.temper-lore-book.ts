import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oneWildingNight = {
  id: "01a0d5f6-1c16-7c59-bf4b-5e792808c3d4",
  type: "page-type/temper-lore-book",
  slug: "one-wilding-night",
  title: "One Wilding Night",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1198,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
