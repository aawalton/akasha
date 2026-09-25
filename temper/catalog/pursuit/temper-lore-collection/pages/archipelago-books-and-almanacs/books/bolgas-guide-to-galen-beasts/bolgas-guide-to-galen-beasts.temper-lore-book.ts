import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bolgasGuideToGalenBeasts = {
  id: "01a0d60c-baf3-7630-ad96-c796dd06cb46",
  type: "page-type/temper-lore-book",
  slug: "bolgas-guide-to-galen-beasts",
  title: "Bolga's Guide to Galen Beasts",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7532,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
