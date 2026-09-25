import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ritesOfTheAbomination = {
  id: "01a0d5f6-d68b-7f48-9f45-bdcd7a2c6703",
  type: "page-type/temper-lore-book",
  slug: "rites-of-the-abomination",
  title: "Rites of the Abomination",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3193,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
