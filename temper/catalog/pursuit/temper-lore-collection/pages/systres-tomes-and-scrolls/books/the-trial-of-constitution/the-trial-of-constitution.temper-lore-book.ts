import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theTrialOfConstitution = {
  id: "01a0d60c-75b6-77a5-a497-14ef0e5f8bb6",
  type: "page-type/temper-lore-book",
  slug: "the-trial-of-constitution",
  title: "The Trial of Constitution",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7022,
  bookIndex: 40,
  charted: true,
  quest: 6767,
  positions: "jsonl",
} as const satisfies TemperLoreBook
