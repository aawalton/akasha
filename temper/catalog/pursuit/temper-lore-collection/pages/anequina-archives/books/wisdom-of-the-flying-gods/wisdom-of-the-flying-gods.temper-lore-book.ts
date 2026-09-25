import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wisdomOfTheFlyingGods = {
  id: "01a0d60b-2346-7ad6-8b62-fd012442c437",
  type: "page-type/temper-lore-book",
  slug: "wisdom-of-the-flying-gods",
  title: "Wisdom of the Flying Gods",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5628,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
