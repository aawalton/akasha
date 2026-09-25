import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const finalLetterOfSergeantBerarah = {
  id: "01a0d5f4-07b7-7331-88bf-041e9a451d25",
  type: "page-type/temper-lore-book",
  slug: "final-letter-of-sergeant-berarah",
  title: "Final Letter of Sergeant Berarah",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 5668,
  charted: true,
  quest: 6398,
  positions: "jsonl",
} as const satisfies TemperLoreBook
