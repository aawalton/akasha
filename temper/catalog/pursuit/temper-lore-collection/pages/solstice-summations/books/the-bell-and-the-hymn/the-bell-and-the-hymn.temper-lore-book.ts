import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBellAndTheHymn = {
  id: "01a0d60d-ff6a-7a65-a9e7-cc66daf1de26",
  type: "page-type/temper-lore-book",
  slug: "the-bell-and-the-hymn",
  title: "The Bell and the Hymn",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8465,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
