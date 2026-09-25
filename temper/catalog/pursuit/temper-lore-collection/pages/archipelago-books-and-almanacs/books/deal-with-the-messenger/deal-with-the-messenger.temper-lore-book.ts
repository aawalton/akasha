import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dealWithTheMessenger = {
  id: "01a0d60c-baf3-763d-ae10-1f65903b3557",
  type: "page-type/temper-lore-book",
  slug: "deal-with-the-messenger",
  title: "Deal with the Messenger",
  collection: "temper-lore-collection/archipelago-books-and-almanacs",
  esoBookId: 7303,
  bookIndex: 1,
  charted: true,
  quest: 6847,
  positions: "jsonl",
} as const satisfies TemperLoreBook
