import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const braveLittleScrib = {
  id: "01a0d5f5-7766-7709-9784-088ee8752f37",
  type: "page-type/temper-lore-book",
  slug: "brave-little-scrib",
  title: "Brave Little Scrib",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 551,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
