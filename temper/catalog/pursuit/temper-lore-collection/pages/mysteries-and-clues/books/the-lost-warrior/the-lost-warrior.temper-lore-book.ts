import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theLostWarrior = {
  id: "01a0d5f4-07b9-7ef3-b665-87a7af233e74",
  type: "page-type/temper-lore-book",
  slug: "the-lost-warrior",
  title: "The Lost Warrior",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 461,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
