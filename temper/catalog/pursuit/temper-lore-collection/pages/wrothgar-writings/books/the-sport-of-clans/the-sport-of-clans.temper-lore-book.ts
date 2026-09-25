import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSportOfClans = {
  id: "01a0d5f6-d68c-7ba1-9db6-a24337626e13",
  type: "page-type/temper-lore-book",
  slug: "the-sport-of-clans",
  title: "The Sport of Clans",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3204,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
