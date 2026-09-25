import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aLetterToTheMayor = {
  id: "01a0d5f1-f450-7521-8173-5491bfab7fb4",
  type: "page-type/temper-lore-book",
  slug: "a-letter-to-the-mayor",
  title: "A Letter to the Mayor",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 598,
  bookIndex: 19,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
