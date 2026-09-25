import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sanctuaryWeaponsReport = {
  id: "01a0d5f3-7054-7e09-8666-faf91f2ba1fd",
  type: "page-type/temper-lore-book",
  slug: "sanctuary-weapons-report",
  title: "Sanctuary: Weapons Report",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 989,
  bookIndex: 44,
  charted: true,
  quest: 4436,
  positions: "jsonl",
} as const satisfies TemperLoreBook
