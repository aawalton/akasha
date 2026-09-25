import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const shakrasLetter = {
  id: "01a0d5f3-0ef8-7e1d-bb27-9f2b660f4173",
  type: "page-type/temper-lore-book",
  slug: "shakras-letter",
  title: "Shakra's Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1346,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
