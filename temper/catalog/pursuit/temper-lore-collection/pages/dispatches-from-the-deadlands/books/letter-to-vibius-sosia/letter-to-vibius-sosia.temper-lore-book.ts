import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToVibiusSosia = {
  id: "01a0d60c-40c0-73db-8e42-1b6f3db675c7",
  type: "page-type/temper-lore-book",
  slug: "letter-to-vibius-sosia",
  title: "Letter to Vibius Sosia",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6781,
  bookIndex: 77,
  charted: true,
  quest: 6694,
  positions: "jsonl",
} as const satisfies TemperLoreBook
