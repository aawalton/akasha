import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToStelveneLothaire = {
  id: "01a0d5f3-0ef8-7fc9-b30e-f806e0c4ca6a",
  type: "page-type/temper-lore-book",
  slug: "letter-to-stelvene-lothaire",
  title: "Letter to Stelvene Lothaire",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2991,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
