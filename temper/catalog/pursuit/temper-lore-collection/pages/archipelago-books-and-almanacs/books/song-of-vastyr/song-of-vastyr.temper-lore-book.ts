import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const songOfVastyr = {
  id: "01a0d60c-baf3-73ac-9dcd-0dc980309e9b",
  type: "page-type/temper-lore-book",
  slug: "song-of-vastyr",
  title: "Song of Vastyr",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7561,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
