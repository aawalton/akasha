import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const guideToTamrielCastles = {
  id: "01a0d60c-baf3-7bf4-8347-6ecf0f215394",
  type: "page-type/temper-lore-book",
  slug: "guide-to-tamriel-castles",
  title: "Guide to Tamriel Castles",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  bookIndex: 31,
} as const satisfies TemperLoreBook
