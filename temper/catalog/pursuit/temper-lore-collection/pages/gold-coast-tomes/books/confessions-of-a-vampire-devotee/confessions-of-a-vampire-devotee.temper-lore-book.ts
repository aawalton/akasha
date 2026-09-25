import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const confessionsOfAVampireDevotee = {
  id: "01a0d5f7-73f9-7392-b07d-5b954bb0e7a8",
  type: "page-type/temper-lore-book",
  slug: "confessions-of-a-vampire-devotee",
  title: "Confessions of a Vampire Devotee",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3530,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
