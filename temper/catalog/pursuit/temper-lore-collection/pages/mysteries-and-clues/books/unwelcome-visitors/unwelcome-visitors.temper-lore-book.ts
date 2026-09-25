import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const unwelcomeVisitors = {
  id: "01a0d5f4-07b9-7b99-b5d9-89513ced5743",
  type: "page-type/temper-lore-book",
  slug: "unwelcome-visitors",
  title: "Unwelcome Visitors",
  collection: "temper-lore-collection/mysteries-and-clues",
  esoBookId: 1455,
  bookIndex: 37,
  charted: true,
  quest: 4624,
  positions: "jsonl",
} as const satisfies TemperLoreBook
