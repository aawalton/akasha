import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const vampiresAndTheirHunters = {
  id: "01a0d5f5-abbb-71be-a684-80fd41073bc5",
  type: "page-type/temper-lore-book",
  slug: "vampires-and-their-hunters",
  title: "Vampires and their Hunters",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1811,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
