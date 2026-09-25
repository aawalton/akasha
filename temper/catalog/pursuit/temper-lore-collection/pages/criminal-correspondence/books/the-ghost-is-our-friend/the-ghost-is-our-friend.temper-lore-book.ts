import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theGhostIsOurFriend = {
  id: "01a0d5f1-f452-7e37-85d8-54ed48343925",
  type: "page-type/temper-lore-book",
  slug: "the-ghost-is-our-friend",
  title: "The Ghost is Our Friend",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 2999,
  bookIndex: 92,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
