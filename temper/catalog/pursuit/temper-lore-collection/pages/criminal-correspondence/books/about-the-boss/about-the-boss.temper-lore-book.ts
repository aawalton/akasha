import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aboutTheBoss = {
  id: "01a0d5f1-f450-70be-b044-9bc5a333f06f",
  type: "page-type/temper-lore-book",
  slug: "about-the-boss",
  title: "About the Boss",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1215,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
