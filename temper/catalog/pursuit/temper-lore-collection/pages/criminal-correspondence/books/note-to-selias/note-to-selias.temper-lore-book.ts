import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToSelias = {
  id: "01a0d5f1-f451-74c9-ba31-9d24244f13de",
  type: "page-type/temper-lore-book",
  slug: "note-to-selias",
  title: "Note to Selias",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 505,
  bookIndex: 15,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
