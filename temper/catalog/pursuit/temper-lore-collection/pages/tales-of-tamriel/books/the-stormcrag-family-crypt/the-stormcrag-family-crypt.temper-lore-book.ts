import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theStormcragFamilyCrypt = {
  id: "01a0d5f5-7767-7f22-91fe-442cb0434dac",
  type: "page-type/temper-lore-book",
  slug: "the-stormcrag-family-crypt",
  title: "The Stormcrag Family Crypt",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 489,
  bookIndex: 9,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
