import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anImperialInMarkarth = {
  id: "01a0d60b-c957-7d54-89e7-1ccd5707c14e",
  type: "page-type/temper-lore-book",
  slug: "an-imperial-in-markarth",
  title: "An Imperial in Markarth",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6395,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
