import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mathocTheImmortal = {
  id: "01a0d60b-2345-7af5-b29a-88f2f1880cb9",
  type: "page-type/temper-lore-book",
  slug: "mathoc-the-immortal",
  title: "Mathoc the Immortal",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5462,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
