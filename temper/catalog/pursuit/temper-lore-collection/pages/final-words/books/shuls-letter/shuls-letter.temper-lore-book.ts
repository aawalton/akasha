import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shulsLetter = {
  id: "01a0d5f6-45ae-713f-ad46-cbcd649802b9",
  type: "page-type/temper-lore-book",
  slug: "shuls-letter",
  title: "Shul's Letter",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1353,
  bookIndex: 32,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
