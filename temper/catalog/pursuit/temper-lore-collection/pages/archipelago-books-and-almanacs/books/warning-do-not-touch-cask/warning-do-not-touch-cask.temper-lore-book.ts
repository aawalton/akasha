import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warningDoNotTouchCask = {
  id: "01a0d60c-baf4-796e-88f8-56856e260769",
  type: "page-type/temper-lore-book",
  slug: "warning-do-not-touch-cask",
  title: "Warning! Do Not Touch Cask!",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7357,
  bookIndex: 23,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
