import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const brokenTuskRitualNotes = {
  id: "01a0d5f5-444b-7efc-861f-59405ff9f911",
  type: "page-type/temper-lore-book",
  slug: "broken-tusk-ritual-notes",
  title: "Broken Tusk Ritual Notes",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1326,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
