import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const septimaTharnsLeadershipMaxims = {
  id: "01a0d5f3-7054-7070-9ae4-b309d33c53f6",
  type: "page-type/temper-lore-book",
  slug: "septima-tharns-leadership-maxims",
  title: "Septima Tharn's Leadership Maxims",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 1150,
  bookIndex: 98,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
