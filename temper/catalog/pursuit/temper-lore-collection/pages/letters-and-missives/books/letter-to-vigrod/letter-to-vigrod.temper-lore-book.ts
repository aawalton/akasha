import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToVigrod = {
  id: "01a0d5f3-0ef8-76f8-812a-bd5d6d381a36",
  type: "page-type/temper-lore-book",
  slug: "letter-to-vigrod",
  title: "Letter to Vigrod",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1007,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
