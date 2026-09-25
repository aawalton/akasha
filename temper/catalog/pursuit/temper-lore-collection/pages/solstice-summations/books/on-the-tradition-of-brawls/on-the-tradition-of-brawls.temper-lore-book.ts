import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheTraditionOfBrawls = {
  id: "01a0d60d-ff6a-770a-92f4-3bc2f534e5c1",
  type: "page-type/temper-lore-book",
  slug: "on-the-tradition-of-brawls",
  title: "On the Tradition of Brawls",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8314,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
