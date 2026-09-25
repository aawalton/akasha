import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fistallesNote = {
  id: "01a0d5f5-444b-78c4-a6bd-b7581013195e",
  type: "page-type/temper-lore-book",
  slug: "fistalles-note",
  title: "Fistalle's Note",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 699,
  bookIndex: 14,
  charted: true,
  quest: 4293,
  positions: "jsonl",
} as const satisfies TemperLoreBook
