import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const guideToNorthernElsweyr = {
  id: "01a0d60b-2345-7e9f-b0df-1f28e7ecadeb",
  type: "page-type/temper-lore-book",
  slug: "guide-to-northern-elsweyr",
  title: "Guide to Northern Elsweyr",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5626,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
