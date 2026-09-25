import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theIntermentOfFeremuzh = {
  id: "01a0d5f5-444c-74f4-afe8-eb0dc74e8ee8",
  type: "page-type/temper-lore-book",
  slug: "the-interment-of-feremuzh",
  title: "The Interment of Feremuzh",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1359,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
