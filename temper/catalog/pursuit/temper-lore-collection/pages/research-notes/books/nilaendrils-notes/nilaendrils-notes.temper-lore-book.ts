import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nilaendrilsNotes = {
  id: "01a0d5f5-1385-7fa2-aa1c-e7ff76aba356",
  type: "page-type/temper-lore-book",
  slug: "nilaendrils-notes",
  title: "Nilaendril's Notes",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 1196,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
