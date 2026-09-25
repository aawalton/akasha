import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const songOfFate7805 = {
  id: "01a0d60c-eb9c-7955-80fb-7bec270adf06",
  type: "page-type/temper-lore-book",
  slug: "song-of-fate-7805",
  title: "Song of Fate",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7805,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
