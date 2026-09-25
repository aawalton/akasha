import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const greetingsFromTheOrcthane = {
  id: "01a0d5f1-f451-7b0e-a99b-64e2fa515bde",
  type: "page-type/temper-lore-book",
  slug: "greetings-from-the-orcthane",
  title: "Greetings from the Orcthane",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 2512,
  bookIndex: 83,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
