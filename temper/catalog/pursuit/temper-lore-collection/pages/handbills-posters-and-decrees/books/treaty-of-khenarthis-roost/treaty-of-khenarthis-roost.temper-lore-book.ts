import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const treatyOfKhenarthisRoost = {
  id: "01a0d5f2-83a3-7e7b-94ca-057b9f338a76",
  type: "page-type/temper-lore-book",
  slug: "treaty-of-khenarthis-roost",
  title: "Treaty of Khenarthi's Roost",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1786,
  bookIndex: 72,
  charted: true,
  quest: 4624,
  positions: "jsonl",
} as const satisfies TemperLoreBook
