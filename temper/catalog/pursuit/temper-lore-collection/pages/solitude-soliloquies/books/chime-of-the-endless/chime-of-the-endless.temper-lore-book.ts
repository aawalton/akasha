import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const chimeOfTheEndless = {
  id: "01a0d60b-8107-7d10-ba02-790ff8fdc45a",
  type: "page-type/temper-lore-book",
  slug: "chime-of-the-endless",
  title: "Chime of the Endless",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5904,
  bookIndex: 100,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
