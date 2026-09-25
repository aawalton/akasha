import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theColossusOfGonfalonBay = {
  id: "01a0d60c-75b6-7de9-98cb-7539b565b76c",
  type: "page-type/temper-lore-book",
  slug: "the-colossus-of-gonfalon-bay",
  title: "The Colossus of Gonfalon Bay",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7269,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
