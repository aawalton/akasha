import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bloodPitPrisonerRoll = {
  id: "01a0d60c-40bf-7ec5-9e65-95aeaca67121",
  type: "page-type/temper-lore-book",
  slug: "blood-pit-prisoner-roll",
  title: "Blood Pit Prisoner Roll",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6776,
  bookIndex: 9,
  charted: true,
  quest: 6707,
  positions: "jsonl",
} as const satisfies TemperLoreBook
