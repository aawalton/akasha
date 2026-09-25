import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const riddlesOfTheDragon = {
  id: "01a0d60d-9a64-726c-a433-840a2bd84da4",
  type: "page-type/temper-lore-book",
  slug: "riddles-of-the-dragon",
  title: "Riddles of the Dragon",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8066,
  bookIndex: 55,
  charted: true,
  quest: 7203,
  positions: "jsonl",
} as const satisfies TemperLoreBook
