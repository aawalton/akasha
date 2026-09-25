import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const archdruidsLetter = {
  id: "01a0d60c-baf2-7534-82b2-107a0186b68d",
  type: "page-type/temper-lore-book",
  slug: "archdruids-letter",
  title: "Archdruid's Letter",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7605,
  bookIndex: 75,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
