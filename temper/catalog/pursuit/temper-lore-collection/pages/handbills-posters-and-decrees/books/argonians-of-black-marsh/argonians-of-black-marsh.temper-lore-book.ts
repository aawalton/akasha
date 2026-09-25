import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const argoniansOfBlackMarsh = {
  id: "01a0d5f2-83a2-7479-82e0-0475af182c9c",
  type: "page-type/temper-lore-book",
  slug: "argonians-of-black-marsh",
  title: "Argonians of Black Marsh",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 1308,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
