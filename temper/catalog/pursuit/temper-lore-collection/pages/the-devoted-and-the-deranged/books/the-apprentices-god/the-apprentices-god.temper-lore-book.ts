import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theApprenticesGod = {
  id: "01a0d5f5-abba-7bd6-afca-0c4821db3dd7",
  type: "page-type/temper-lore-book",
  slug: "the-apprentices-god",
  title: "The Apprentices' God",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 770,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
