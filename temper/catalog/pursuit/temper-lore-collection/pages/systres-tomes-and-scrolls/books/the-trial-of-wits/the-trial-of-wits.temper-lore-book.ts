import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrialOfWits = {
  id: "01a0d60c-75b6-7bee-a4a7-c8178794ba12",
  type: "page-type/temper-lore-book",
  slug: "the-trial-of-wits",
  title: "The Trial of Wits",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7019,
  bookIndex: 39,
  charted: true,
  quest: 6767,
  positions: "jsonl",
} as const satisfies TemperLoreBook
