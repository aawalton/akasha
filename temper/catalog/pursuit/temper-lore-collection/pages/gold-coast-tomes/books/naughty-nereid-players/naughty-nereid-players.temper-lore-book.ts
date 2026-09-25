import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const naughtyNereidPlayers = {
  id: "01a0d5f7-73fa-7f38-b5be-62aa309b6c9f",
  type: "page-type/temper-lore-book",
  slug: "naughty-nereid-players",
  title: "Naughty Nereid Players",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3653,
  bookIndex: 67,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
