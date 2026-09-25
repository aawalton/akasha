import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const corgradStatueInscription = {
  id: "01a0d5f4-07b7-7548-9953-82da25f63a14",
  type: "page-type/temper-lore-book",
  slug: "corgrad-statue-inscription",
  title: "Corgrad Statue Inscription",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 4977,
  bookIndex: 83,
  charted: true,
  quest: 6146,
  positions: "jsonl",
} as const satisfies TemperLoreBook
