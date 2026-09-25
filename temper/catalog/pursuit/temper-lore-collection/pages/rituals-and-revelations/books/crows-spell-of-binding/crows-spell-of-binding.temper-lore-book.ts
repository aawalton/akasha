import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const crowsSpellOfBinding = {
  id: "01a0d5f5-444b-7635-a8af-0d1f8033be7b",
  type: "page-type/temper-lore-book",
  slug: "crows-spell-of-binding",
  title: "Crow's Spell of Binding",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1620,
  bookIndex: 62,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
