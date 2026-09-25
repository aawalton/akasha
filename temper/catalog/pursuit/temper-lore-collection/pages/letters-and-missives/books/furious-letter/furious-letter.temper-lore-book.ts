import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const furiousLetter = {
  id: "01a0d5f3-0ef7-74de-b06c-1943c23bde93",
  type: "page-type/temper-lore-book",
  slug: "furious-letter",
  title: "Furious Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1028,
  bookIndex: 29,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
