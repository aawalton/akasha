import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSackingOfBruma = {
  id: "01a0d60d-708e-73eb-b5bf-f171891a0183",
  type: "page-type/temper-lore-book",
  slug: "the-sacking-of-bruma",
  title: "The Sacking of Bruma",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8180,
  bookIndex: 37,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
