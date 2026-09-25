import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aTravelGuideToTamrielCastles = {
  id: "01a0d60c-baf2-7088-b3cc-f8da16ecc89e",
  type: "page-type/temper-lore-book",
  slug: "a-travel-guide-to-tamriel-castles",
  title: "A Travel Guide to Tamriel Castles",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7470,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
