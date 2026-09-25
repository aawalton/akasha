import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const crumpledNote = {
  id: "01a0d60d-ff69-7469-88bb-d1743b9dddaf",
  type: "page-type/temper-lore-book",
  slug: "crumpled-note",
  title: "Crumpled Note",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8449,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
