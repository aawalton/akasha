import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thePrisonMustFall = {
  id: "01a0d5f6-f385-7e80-b1d1-3b1a34c18f68",
  type: "page-type/temper-lore-book",
  slug: "the-prison-must-fall",
  title: "The Prison Must Fall",
  collection: "temper-lore-collection/imperial-library",
  esoBookId: 2833,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
