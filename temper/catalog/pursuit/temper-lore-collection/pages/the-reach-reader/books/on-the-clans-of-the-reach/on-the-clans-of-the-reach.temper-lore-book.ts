import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheClansOfTheReach = {
  id: "01a0d60b-c958-7d56-b8b9-d3d9e077927b",
  type: "page-type/temper-lore-book",
  slug: "on-the-clans-of-the-reach",
  title: "On the Clans of the Reach",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 5909,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
