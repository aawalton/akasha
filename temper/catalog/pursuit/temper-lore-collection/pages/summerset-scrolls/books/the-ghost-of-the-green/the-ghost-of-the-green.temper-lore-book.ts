import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGhostOfTheGreen = {
  id: "01a0d60a-d5be-7466-817c-917d62685602",
  type: "page-type/temper-lore-book",
  slug: "the-ghost-of-the-green",
  title: "The Ghost of the Green",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4838,
  bookIndex: 71,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
