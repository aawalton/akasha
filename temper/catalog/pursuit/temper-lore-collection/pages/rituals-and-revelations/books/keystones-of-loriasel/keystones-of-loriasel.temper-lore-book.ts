import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const keystonesOfLoriasel = {
  id: "01a0d5f5-444b-78be-b27b-37a80ca64c7b",
  type: "page-type/temper-lore-book",
  slug: "keystones-of-loriasel",
  title: "Keystones of Loriasel",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 100,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
