import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAmronalsSpell = {
  id: "01a0d5f6-1c16-76da-9690-db990daec802",
  type: "page-type/temper-lore-book",
  slug: "the-amronals-spell",
  title: "The Amronal's Spell",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 1810,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
