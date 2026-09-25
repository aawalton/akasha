import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const museumGuildLetter = {
  id: "01a0d5f5-abba-7c0f-a391-04bd2483b637",
  type: "page-type/temper-lore-book",
  slug: "museum-guild-letter",
  title: "Museum Guild Letter",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 6777,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
