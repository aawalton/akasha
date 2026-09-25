import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromAbnurTharn = {
  id: "01a0d60b-2345-7997-8e8e-c66c5aea6a64",
  type: "page-type/temper-lore-book",
  slug: "letter-from-abnur-tharn",
  title: "Letter from Abnur Tharn",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5430,
  bookIndex: 4,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
