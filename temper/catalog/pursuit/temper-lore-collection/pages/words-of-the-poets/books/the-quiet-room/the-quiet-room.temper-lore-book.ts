import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theQuietRoom = {
  id: "01a0d5f6-1c16-7432-9273-72f11b77afe9",
  type: "page-type/temper-lore-book",
  slug: "the-quiet-room",
  title: "The Quiet Room",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 442,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
