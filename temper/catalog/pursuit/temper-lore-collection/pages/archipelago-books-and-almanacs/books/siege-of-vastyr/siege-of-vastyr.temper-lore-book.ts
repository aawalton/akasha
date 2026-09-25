import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const siegeOfVastyr = {
  id: "01a0d60c-baf3-7c42-9a67-406395ef6a17",
  type: "page-type/temper-lore-book",
  slug: "siege-of-vastyr",
  title: "Siege of Vastyr",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7548,
  bookIndex: 59,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
