import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainBlackheartsLog = {
  id: "01a0d5f5-abb9-7eac-8e31-4402951f37f8",
  type: "page-type/temper-lore-book",
  slug: "captain-blackhearts-log",
  title: "Captain Blackheart's Log",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1613,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
