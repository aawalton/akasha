import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const neelosNotes = {
  id: "01a0d5f5-444b-76cc-ab28-82caa261cc1d",
  type: "page-type/temper-lore-book",
  slug: "neelos-notes",
  title: "Neelo's Notes",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 4563,
  bookIndex: 92,
  charted: true,
  quest: 6023,
  positions: "jsonl",
} as const satisfies TemperLoreBook
