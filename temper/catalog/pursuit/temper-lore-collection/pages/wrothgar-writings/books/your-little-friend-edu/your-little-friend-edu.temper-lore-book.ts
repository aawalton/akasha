import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const yourLittleFriendEdu = {
  id: "01a0d5f6-d68c-78b8-a949-21b06c1b71ac",
  type: "page-type/temper-lore-book",
  slug: "your-little-friend-edu",
  title: "Your Little Friend, Edu",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3030,
  bookIndex: 27,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
