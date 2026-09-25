import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const trappedInEbonStadmont = {
  id: "01a0d60a-d5be-7699-900d-443267bfbeeb",
  type: "page-type/temper-lore-book",
  slug: "trapped-in-ebon-stadmont",
  title: "Trapped in Ebon Stadmont",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4994,
  bookIndex: 21,
  charted: true,
  quest: 6119,
  positions: "jsonl",
} as const satisfies TemperLoreBook
