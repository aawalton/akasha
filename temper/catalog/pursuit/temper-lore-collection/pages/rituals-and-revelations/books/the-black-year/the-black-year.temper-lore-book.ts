import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBlackYear = {
  id: "01a0d5f5-444c-78e7-b274-e0617c45db15",
  type: "page-type/temper-lore-book",
  slug: "the-black-year",
  title: "The Black Year",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 965,
  bookIndex: 32,
  charted: true,
  quest: 4386,
  positions: "jsonl",
} as const satisfies TemperLoreBook
