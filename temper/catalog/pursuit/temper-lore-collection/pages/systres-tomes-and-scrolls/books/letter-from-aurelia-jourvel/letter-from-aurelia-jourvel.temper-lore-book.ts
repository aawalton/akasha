import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromAureliaJourvel = {
  id: "01a0d60c-75b5-726a-a07a-92cf204e1c83",
  type: "page-type/temper-lore-book",
  slug: "letter-from-aurelia-jourvel",
  title: "Letter from Aurelia Jourvel",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7099,
  bookIndex: 61,
  charted: true,
  quest: 6789,
  positions: "jsonl",
} as const satisfies TemperLoreBook
