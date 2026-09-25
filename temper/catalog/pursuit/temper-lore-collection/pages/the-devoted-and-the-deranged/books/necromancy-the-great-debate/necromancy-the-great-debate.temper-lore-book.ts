import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const necromancyTheGreatDebate = {
  id: "01a0d5f5-abba-7663-a502-fbccd7ae47be",
  type: "page-type/temper-lore-book",
  slug: "necromancy-the-great-debate",
  title: "Necromancy: The Great Debate",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1536,
  bookIndex: 43,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
