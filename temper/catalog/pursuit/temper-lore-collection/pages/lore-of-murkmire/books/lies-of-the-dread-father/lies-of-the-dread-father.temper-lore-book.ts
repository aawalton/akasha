import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const liesOfTheDreadFather = {
  id: "01a0d5f6-a29a-771f-ba2b-72c5d412607a",
  type: "page-type/temper-lore-book",
  slug: "lies-of-the-dread-father",
  title: "Lies of the Dread-Father",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5361,
  bookIndex: 92,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
