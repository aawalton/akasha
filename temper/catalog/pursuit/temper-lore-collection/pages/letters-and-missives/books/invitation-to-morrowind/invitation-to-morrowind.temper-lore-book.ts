import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const invitationToMorrowind = {
  id: "01a0d5f3-0ef7-7770-8ec3-2874664f68a7",
  type: "page-type/temper-lore-book",
  slug: "invitation-to-morrowind",
  title: "Invitation to Morrowind",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 4576,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
