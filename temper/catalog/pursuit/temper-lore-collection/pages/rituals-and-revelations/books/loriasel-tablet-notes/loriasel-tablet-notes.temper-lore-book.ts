import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const loriaselTabletNotes = {
  id: "01a0d5f5-444b-7388-a2cb-17e98ed5a248",
  type: "page-type/temper-lore-book",
  slug: "loriasel-tablet-notes",
  title: "Loriasel Tablet Notes",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1918,
  bookIndex: 72,
  charted: true,
  quest: 4854,
  positions: "jsonl",
} as const satisfies TemperLoreBook
