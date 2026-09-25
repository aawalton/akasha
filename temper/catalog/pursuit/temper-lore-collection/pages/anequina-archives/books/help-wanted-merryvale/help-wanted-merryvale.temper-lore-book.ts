import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const helpWantedMerryvale = {
  id: "01a0d60b-2345-773c-b8c5-83a449291f6d",
  type: "page-type/temper-lore-book",
  slug: "help-wanted-merryvale",
  title: "Help Wanted: Merryvale!",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5417,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
