import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToHearthMother = {
  id: "01a0d5f6-d68b-78ae-a073-e87660cbc3cb",
  type: "page-type/temper-lore-book",
  slug: "letter-to-hearth-mother",
  title: "Letter to Hearth-Mother",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3133,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
