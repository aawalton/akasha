import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const graverobbersLament = {
  id: "01a0d60b-a361-7752-bf07-bea6521103a1",
  type: "page-type/temper-lore-book",
  slug: "graverobbers-lament",
  title: "Graverobber's Lament",
  collection: "temper-lore-collection/western-skyrim-register",
  esoBookId: 6046,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
