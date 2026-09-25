import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWitchesOfHagFen = {
  id: "01a0d5f5-1386-7751-b881-a9424d9d401e",
  type: "page-type/temper-lore-book",
  slug: "the-witches-of-hag-fen",
  title: "The Witches of Hag Fen",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1234,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
