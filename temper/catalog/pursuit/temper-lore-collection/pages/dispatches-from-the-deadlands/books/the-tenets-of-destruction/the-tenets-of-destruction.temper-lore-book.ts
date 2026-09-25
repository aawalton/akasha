import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTenetsOfDestruction = {
  id: "01a0d60c-40c1-7812-ad9b-3cb184ecc4c4",
  type: "page-type/temper-lore-book",
  slug: "the-tenets-of-destruction",
  title: "The Tenets of Destruction",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6931,
  bookIndex: 54,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
