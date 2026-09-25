import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const boethiahsGlory = {
  id: "01a0d5f2-253a-7f59-9f75-a38d43100d55",
  type: "page-type/temper-lore-book",
  slug: "boethiahs-glory",
  title: "Boethiah's Glory",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 791,
  bookIndex: 26,
  charted: true,
  quest: 5469,
  positions: "jsonl",
} as const satisfies TemperLoreBook
