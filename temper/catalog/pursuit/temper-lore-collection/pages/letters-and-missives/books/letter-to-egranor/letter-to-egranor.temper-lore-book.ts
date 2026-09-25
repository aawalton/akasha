import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToEgranor = {
  id: "01a0d5f3-0ef8-7b60-a5fa-a349b84b425f",
  type: "page-type/temper-lore-book",
  slug: "letter-to-egranor",
  title: "Letter to Egranor",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 962,
  bookIndex: 25,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
