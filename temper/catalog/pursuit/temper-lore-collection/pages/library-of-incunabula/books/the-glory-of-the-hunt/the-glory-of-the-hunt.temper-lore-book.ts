import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGloryOfTheHunt = {
  id: "01a0d5f8-02f9-7913-9306-ea63ebba8d38",
  type: "page-type/temper-lore-book",
  slug: "the-glory-of-the-hunt",
  title: "The Glory of the Hunt",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 5048,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
