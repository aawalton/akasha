import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oathbreakersOfOuze = {
  id: "01a0d5f5-abba-7253-a558-28b085a84645",
  type: "page-type/temper-lore-book",
  slug: "oathbreakers-of-ouze",
  title: "Oathbreakers of Ouze",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 401,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
