import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const anInvitationToDiscovery = {
  id: "01a0d5f7-aa98-7972-aa40-33977aa8be35",
  type: "page-type/temper-lore-book",
  slug: "an-invitation-to-discovery",
  title: 'An "Invitation" to Discovery',
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3992,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
