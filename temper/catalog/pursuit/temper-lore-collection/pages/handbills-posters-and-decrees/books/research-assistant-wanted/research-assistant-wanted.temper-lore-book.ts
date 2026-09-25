import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const researchAssistantWanted = {
  id: "01a0d5f2-83a3-7d62-aa43-af7fd1bbd36b",
  type: "page-type/temper-lore-book",
  slug: "research-assistant-wanted",
  title: "Research Assistant Wanted",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2017,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
