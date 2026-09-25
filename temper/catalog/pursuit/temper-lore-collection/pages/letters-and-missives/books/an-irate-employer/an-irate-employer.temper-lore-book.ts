import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anIrateEmployer = {
  id: "01a0d5f3-0ef7-7fbd-bd34-da6a26101229",
  type: "page-type/temper-lore-book",
  slug: "an-irate-employer",
  title: "An Irate Employer",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2412,
  bookIndex: 92,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
