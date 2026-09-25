import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const invitationCoverLetter = {
  id: "01a0d60b-fdb0-7f01-a77c-86fa586dcc63",
  type: "page-type/temper-lore-book",
  slug: "invitation-cover-letter",
  title: "Invitation Cover Letter",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6507,
  bookIndex: 4,
  charted: true,
  quest: 6619,
  positions: "jsonl",
} as const satisfies TemperLoreBook
