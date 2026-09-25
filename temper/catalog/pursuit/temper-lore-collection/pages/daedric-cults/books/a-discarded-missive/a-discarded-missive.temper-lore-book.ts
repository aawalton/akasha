import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aDiscardedMissive = {
  id: "01a0d5f2-253a-77ba-9cb5-aac6a2ba34b3",
  type: "page-type/temper-lore-book",
  slug: "a-discarded-missive",
  title: "A Discarded Missive",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1313,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
