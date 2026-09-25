import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const venomsSanctuaryMarginalia = {
  id: "01a0d5f7-73fb-742e-9077-362df9f3dd97",
  type: "page-type/temper-lore-book",
  slug: "venoms-sanctuary-marginalia",
  title: "Venom's Sanctuary Marginalia",
  collection: "temper-lore-collection/gold-coast-tomes",
  esoBookId: 3643,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
