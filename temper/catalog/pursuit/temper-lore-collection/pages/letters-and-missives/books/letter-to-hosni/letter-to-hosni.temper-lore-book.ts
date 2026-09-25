import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToHosni = {
  id: "01a0d5f3-0ef8-799f-9778-c63210b44e48",
  type: "page-type/temper-lore-book",
  slug: "letter-to-hosni",
  title: "Letter to Hosni",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1101,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
