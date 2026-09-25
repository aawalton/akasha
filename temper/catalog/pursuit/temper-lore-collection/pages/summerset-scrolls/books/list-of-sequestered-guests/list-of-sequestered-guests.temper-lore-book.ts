import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const listOfSequesteredGuests = {
  id: "01a0d60a-d5bd-7c0d-9615-c6654ca7bbd3",
  type: "page-type/temper-lore-book",
  slug: "list-of-sequestered-guests",
  title: "List of Sequestered Guests",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4692,
  bookIndex: 38,
  charted: true,
  quest: 6096,
  positions: "jsonl",
} as const satisfies TemperLoreBook
