import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const invitationToTheHunt = {
  id: "01a0d60b-4e02-7aab-86ff-9774050284b4",
  type: "page-type/temper-lore-book",
  slug: "invitation-to-the-hunt",
  title: "Invitation to the Hunt",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5678,
  bookIndex: 16,
  charted: true,
  quest: 6408,
  positions: "jsonl",
} as const satisfies TemperLoreBook
