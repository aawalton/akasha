import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shazahsDiary = {
  id: "01a0d60b-2345-773b-8acb-c30b5211957b",
  type: "page-type/temper-lore-book",
  slug: "shazahs-diary",
  title: "Shazah's Diary",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5591,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
