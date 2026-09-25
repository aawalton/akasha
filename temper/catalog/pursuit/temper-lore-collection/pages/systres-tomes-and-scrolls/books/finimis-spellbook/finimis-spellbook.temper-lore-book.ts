import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const finimisSpellbook = {
  id: "01a0d60c-75b5-771e-a263-d7a9975f94af",
  type: "page-type/temper-lore-book",
  slug: "finimis-spellbook",
  title: "Finimi's Spellbook",
  collection: "temper-lore-collection/systres-tomes-and-scrolls",
  esoBookId: 7145,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
