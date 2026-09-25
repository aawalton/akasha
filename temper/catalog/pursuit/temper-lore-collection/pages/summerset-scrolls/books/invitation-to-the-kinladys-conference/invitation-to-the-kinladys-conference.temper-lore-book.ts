import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const invitationToTheKinladysConference = {
  id: "01a0d60a-d5bd-77d0-9661-b61733449c7c",
  type: "page-type/temper-lore-book",
  slug: "invitation-to-the-kinladys-conference",
  title: "Invitation to the Kinlady's Conference",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5067,
  bookIndex: 49,
  charted: true,
  quest: 6096,
  positions: "jsonl",
} as const satisfies TemperLoreBook
