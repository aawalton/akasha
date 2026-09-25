import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reeveNardarmorsPrivateJournal = {
  id: "01a0d60d-bbe4-77ed-b279-cb0d9add9fb4",
  type: "page-type/temper-lore-book",
  slug: "reeve-nardarmors-private-journal",
  title: "Reeve Nardarmor's Private Journal",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8008,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
