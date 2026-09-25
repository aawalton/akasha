import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anInvitationToWealth = {
  id: "01a0d5f2-83a2-71c8-b23f-824361539dd5",
  type: "page-type/temper-lore-book",
  slug: "an-invitation-to-wealth",
  title: "An Invitation to Wealth",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 860,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
