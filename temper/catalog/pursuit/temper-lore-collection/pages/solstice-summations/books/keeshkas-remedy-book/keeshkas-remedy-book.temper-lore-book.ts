import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const keeshkasRemedyBook = {
  id: "01a0d60d-ff69-77b2-9c74-95ca6e33175a",
  type: "page-type/temper-lore-book",
  slug: "keeshkas-remedy-book",
  title: "Keeshka's Remedy Book",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8463,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
