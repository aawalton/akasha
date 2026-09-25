import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const rulesOfTheGame = {
  id: "01a0d60c-75b6-727b-914b-aebfd42d2e0d",
  type: "page-type/temper-lore-book",
  slug: "rules-of-the-game",
  title: "Rules of the Game",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 6970,
  charted: true,
  quest: 6756,
  positions: "jsonl",
} as const satisfies TemperLoreBook
