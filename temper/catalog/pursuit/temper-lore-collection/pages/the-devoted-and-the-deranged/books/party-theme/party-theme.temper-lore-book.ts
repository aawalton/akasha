import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const partyTheme = {
  id: "01a0d5f5-abba-77ef-b7b4-c206d1cbfbe2",
  type: "page-type/temper-lore-book",
  slug: "party-theme",
  title: "Party Theme",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 1537,
  bookIndex: 44,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
