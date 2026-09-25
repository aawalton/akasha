import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kivsNotes = {
  id: "01a0d60c-75b5-7a78-aa04-6a8df2637536",
  type: "page-type/temper-lore-book",
  slug: "kivs-notes",
  title: "Kiv's Notes",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7107,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
