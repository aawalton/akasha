import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const casesOfTheDivineProsecution = {
  id: "01a0d60a-d5bc-7f0d-a58a-efcdc67d634c",
  type: "page-type/temper-lore-book",
  slug: "cases-of-the-divine-prosecution",
  title: "Cases of the Divine Prosecution",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5110,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
