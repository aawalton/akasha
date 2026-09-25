import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const manualOfSpellcraft = {
  id: "01a0d5e3-fde3-7f26-8950-bb6fd0c448f0",
  type: "page-type/temper-lore-book",
  slug: "manual-of-spellcraft",
  title: "Manual of Spellcraft",
  collection: "temper-lore-collection/magic-and-magicka",
  bookIndex: 4,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
