import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToNantharion = {
  id: "01a0d60d-4ab0-70b6-8f8e-a5920b3e05d2",
  type: "page-type/temper-lore-book",
  slug: "note-to-nantharion",
  title: "Note to Nantharion",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7899,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
