import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theEverscrivenTome = {
  id: "01a0d5f5-abba-7992-9537-428eeec0e0e3",
  type: "page-type/temper-lore-book",
  slug: "the-everscriven-tome",
  title: "The Everscriven Tome",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 767,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
