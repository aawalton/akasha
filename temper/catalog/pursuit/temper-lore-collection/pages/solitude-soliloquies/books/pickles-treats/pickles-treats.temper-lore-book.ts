import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const picklesTreats = {
  id: "01a0d60b-8108-73fc-abde-433c55b2100e",
  type: "page-type/temper-lore-book",
  slug: "pickles-treats",
  title: "Pickle's Treats",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6241,
  bookIndex: 36,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
