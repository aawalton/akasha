import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aDealIsStruck = {
  id: "01a0d5f2-253a-7829-90d4-23d026917994",
  type: "page-type/temper-lore-book",
  slug: "a-deal-is-struck",
  title: "A Deal is Struck",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 6494,
  bookIndex: 95,
  charted: true,
  quest: 6627,
  positions: "jsonl",
} as const satisfies TemperLoreBook
