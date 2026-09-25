import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aTallyOfVillagers = {
  id: "01a0d5f2-253a-718c-916f-2fb3dd13fe34",
  type: "page-type/temper-lore-book",
  slug: "a-tally-of-villagers",
  title: "A Tally of Villagers",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1002,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
