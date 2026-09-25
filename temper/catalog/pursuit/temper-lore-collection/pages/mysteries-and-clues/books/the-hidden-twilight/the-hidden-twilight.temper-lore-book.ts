import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHiddenTwilight = {
  id: "01a0d5f4-07b9-73a3-85f2-36073d4b0276",
  type: "page-type/temper-lore-book",
  slug: "the-hidden-twilight",
  title: "The Hidden Twilight",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1372,
  bookIndex: 35,
  charted: true,
  quest: 3916,
  positions: "jsonl",
} as const satisfies TemperLoreBook
