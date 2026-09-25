import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBurningOfSenchal = {
  id: "01a0d60b-4e03-7951-9291-754fc3ce1448",
  type: "page-type/temper-lore-book",
  slug: "the-burning-of-senchal",
  title: "The Burning of Senchal",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5766,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
