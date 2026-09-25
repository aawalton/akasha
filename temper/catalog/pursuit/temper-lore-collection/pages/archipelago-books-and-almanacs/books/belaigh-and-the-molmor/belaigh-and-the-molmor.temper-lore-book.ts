import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const belaighAndTheMolmor = {
  id: "01a0d60c-baf3-7fda-a2bd-1a9009262a9b",
  type: "page-type/temper-lore-book",
  slug: "belaigh-and-the-molmor",
  title: "Belaigh and the Molmor",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7551,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
