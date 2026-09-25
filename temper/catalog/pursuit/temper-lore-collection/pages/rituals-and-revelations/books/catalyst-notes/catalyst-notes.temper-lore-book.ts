import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const catalystNotes = {
  id: "01a0d5f5-444b-79b6-91c0-7f51a5e9a5a4",
  type: "page-type/temper-lore-book",
  slug: "catalyst-notes",
  title: "Catalyst Notes",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1406,
  bookIndex: 51,
  charted: true,
  quest: 4623,
  positions: "jsonl",
} as const satisfies TemperLoreBook
