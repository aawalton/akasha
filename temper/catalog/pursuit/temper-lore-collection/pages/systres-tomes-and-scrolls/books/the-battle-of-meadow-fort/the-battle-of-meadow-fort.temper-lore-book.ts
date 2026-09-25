import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBattleOfMeadowFort = {
  id: "01a0d60c-75b6-7dab-a9ad-08a7f700f267",
  type: "page-type/temper-lore-book",
  slug: "the-battle-of-meadow-fort",
  title: "The Battle of Meadow Fort",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 6947,
  bookIndex: 41,
  charted: true,
  quest: 6760,
  positions: "jsonl",
} as const satisfies TemperLoreBook
