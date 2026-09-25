import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSpiresOfThe34thSermon = {
  id: "01a0d60c-eb9c-711b-9474-38f6ae89893f",
  type: "page-type/temper-lore-book",
  slug: "the-spires-of-the-34th-sermon",
  title: "The Spires of the 34th Sermon",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7439,
  bookIndex: 50,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
