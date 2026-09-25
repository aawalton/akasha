import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whichGuildIsForYou = {
  id: "01a0d60b-c958-7fcb-9c2f-3ca2c3f46746",
  type: "page-type/temper-lore-book",
  slug: "which-guild-is-for-you",
  title: "Which Guild is for You?",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6108,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
