import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrialOfPerseverance = {
  id: "01a0d60c-75b6-7ce0-95f7-5e87f9ffea57",
  type: "page-type/temper-lore-book",
  slug: "the-trial-of-perseverance",
  title: "The Trial of Perseverance",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7007,
  bookIndex: 38,
  charted: true,
  quest: 6767,
  positions: "jsonl",
} as const satisfies TemperLoreBook
