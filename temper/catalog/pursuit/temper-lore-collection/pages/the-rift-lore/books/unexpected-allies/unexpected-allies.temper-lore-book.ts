import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const unexpectedAllies = {
  id: "01a0d5e4-b08b-74be-b64f-1916f7109139",
  type: "page-type/temper-lore-book",
  slug: "unexpected-allies",
  title: "Unexpected Allies",
  collection: "temper-lore-collection/the-rift-lore",
  bookIndex: 5,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
