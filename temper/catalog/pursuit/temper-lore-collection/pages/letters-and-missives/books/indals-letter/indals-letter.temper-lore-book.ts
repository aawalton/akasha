import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const indalsLetter = {
  id: "01a0d5f3-0ef7-792b-9ffe-c62184f91323",
  type: "page-type/temper-lore-book",
  slug: "indals-letter",
  title: "Indal's Letter",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1293,
  bookIndex: 45,
  charted: true,
  quest: 4537,
  positions: "jsonl",
} as const satisfies TemperLoreBook
