import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hubertsNotes = {
  id: "01a0d5f6-45ad-7185-bd61-06461d178bc1",
  type: "page-type/temper-lore-book",
  slug: "huberts-notes",
  title: "Hubert's Notes",
  collection: "temper-lore-collection/final-words",
  esoBookId: 1184,
  bookIndex: 24,
  charted: true,
  quest: 1615,
  positions: "jsonl",
} as const satisfies TemperLoreBook
