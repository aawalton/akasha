import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theHouseOfOrsimerGlories = {
  id: "01a0d5f6-d68c-7ae7-b2fd-2ae1405a3167",
  type: "page-type/temper-lore-book",
  slug: "the-house-of-orsimer-glories",
  title: "The House of Orsimer Glories",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3131,
  bookIndex: 44,
  charted: true,
  quest: 5476,
  positions: "jsonl",
} as const satisfies TemperLoreBook
