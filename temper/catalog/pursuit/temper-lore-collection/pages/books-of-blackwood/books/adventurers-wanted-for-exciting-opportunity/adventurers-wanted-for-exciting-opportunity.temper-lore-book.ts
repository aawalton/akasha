import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const adventurersWantedForExcitingOpportunity = {
  id: "01a0d60b-fdaf-7bc8-ae92-ceab2471311f",
  type: "page-type/temper-lore-book",
  slug: "adventurers-wanted-for-exciting-opportunity",
  title: "Adventurers Wanted for Exciting Opportunity!",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6526,
  bookIndex: 23,
  charted: true,
  quest: 6648,
  positions: "jsonl",
} as const satisfies TemperLoreBook
