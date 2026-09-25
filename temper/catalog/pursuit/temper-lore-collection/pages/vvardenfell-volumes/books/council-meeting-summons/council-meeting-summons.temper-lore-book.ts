import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const councilMeetingSummons = {
  id: "01a0d5f7-aa98-7990-a4ec-a18e15e8b3dd",
  type: "page-type/temper-lore-book",
  slug: "council-meeting-summons",
  title: "Council Meeting Summons",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4110,
  bookIndex: 78,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
