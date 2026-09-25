import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToGabrielle = {
  id: "01a0d60e-45b3-7529-9368-8941e5de9f8e",
  type: "page-type/temper-lore-book",
  slug: "note-to-gabrielle",
  title: "Note to Gabrielle",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8309,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
