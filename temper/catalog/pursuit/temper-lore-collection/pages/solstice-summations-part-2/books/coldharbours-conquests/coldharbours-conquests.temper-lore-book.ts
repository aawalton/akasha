import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const coldharboursConquests = {
  id: "01a0d60e-45b2-7f11-ad91-4dcaee3fc89d",
  type: "page-type/temper-lore-book",
  slug: "coldharbours-conquests",
  title: "Coldharbour's Conquests",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8466,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
