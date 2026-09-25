import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const merienSellansSpellbook = {
  id: "01a0d5f5-444b-7806-9c9d-15545e8be450",
  type: "page-type/temper-lore-book",
  slug: "merien-sellans-spellbook",
  title: "Merien Sellan's Spellbook",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 836,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
