import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const gabriellesJournal = {
  id: "01a0d60d-ff69-79b8-b985-c556456b6eaf",
  type: "page-type/temper-lore-book",
  slug: "gabrielles-journal",
  title: "Gabrielle's Journal",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8513,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
